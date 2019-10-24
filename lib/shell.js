#!/usr/bin/env node 

var shell = require("shelljs");
var readline = require("readline-sync");
var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var client = require("scp2");

var deployPath = path.join(process.cwd(), ".deploy");
console.log("shell", __dirname, process.argv, process.cwd(), deployPath);
if(!fs.existsSync(deployPath)){
    exit();
}
console.log(fs.readFileSync(deployPath).toString());
var conf = JSON.parse(fs.readFileSync(deployPath).toString());
var argvArr = process.argv;
var argv = argvArr[argvArr.length - 1]

function init(obj){
    if(typeof obj[argv] != "object"){
        return;
    }
    obj[argv].map(function(step){
        action(step);
    });
}

function action(obj){
    switch(obj.type){
        case "upload":
            scp(obj);
        break;
        case "cd":
            shell.cd(obj.path);
        break;        
        case "copy":
            shell.cp("-rf", obj.source, obj.dest);
        break;
        case "command":
            shell.exec(obj.command);
        break;
        case "git-commit":
            gitCommit(obj);
        break;
        case "git-pull":
            gitPull(obj);
        break;
    }
}
init(conf);

function scp(obj){
    // try{
    //     console.log("正在上传文件....")
    //     child_process.execFileSync("./pscp.exe", ["-l", obj.user, "-pw", obj.password, "-r", obj.source, obj.ip + ":" + obj.path]);
    //     console.log("上传文件成功!")
    // }catch(e){
    //     console.log("上传失败:", e);
    // }

    console.log("正在上传文件....")
    client.scp(obj.source, {
        host: obj.host,
        username: obj.username,
        password: obj.password,
        path: obj.path
    }, function(err, a, b, c){
        if(err == undefined){
            console.log("上传成功! " )
        }else{
            console.log("上传失败！原因:" + err);
        }
        
    });    
}

function gitCommit(obj){
    if(!shell.which("git")){
        shell.echo("don't find git");
        return;
    }
    
    shell.exec("git add .");    
    
    //填写提交内容
    var msg = obj.content;
    if(obj.content == undefined){
        msg = read("Write commit message: ");
    }

    shell.exec("git commit -am '" + msg + "'");
    shell.exec("git push");
}

function gitPull(){
    if(!shell.which("git")){
        shell.echo("don't find git");
        return;
    }
    shell.exec("git pull");
}


function read(title){
    return readline.question(title)
}

// console.log(command);
