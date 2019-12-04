#!/usr/bin/env node 

var shell = require("shelljs");
var prompts = require("prompts");
// var readline = require("readline-sync");

var file = require("./util/file");
var fs = require("fs");
var path = require("path");
var client = require("scp2");

// var conf = JSON.parse(fs.readFileSync(deployPath).toString());
// var argvArr = process.argv;
// var argv = argvArr[argvArr.length - 1];

function init(name){
    var deployPath = path.join(process.cwd(), "deploy.json");
    // console.log("shell", __dirname, process.argv, process.cwd(), deployPath);
    if(!fs.existsSync(deployPath)){
        exit();
    }

    var deploy = JSON.parse(file.read(deployPath));
    var actions = deploy.actions;
    // console.log("obj", actions);
    
    var action;
    typeof actions == "object" && actions.map(function(item, index){        
        if(item["name"] == name){
            action = item;
        }
    })


    if(typeof action != "object"){
        shell.echo("未找到相关发布脚本");
        return;
    }

    action.steps.map(function(step){
        operate(step);
    });
}

function operate(obj){
    // 显示步骤标题
    if(obj.title){
        shell.echo(obj.title)
    }    
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


function scp(obj){
    // try{
    //     console.log("正在上传文件....")
    //     child_process.execFileSync("./pscp.exe", ["-l", obj.user, "-pw", obj.password, "-r", obj.source, obj.ip + ":" + obj.path]);
    //     console.log("上传文件成功!")
    // }catch(e){
    //     console.log("上传失败:", e);
    // }

    console.log("正在上传文件....");
    
    client.on("transfer", function(butter, uploaded, total){
        console.log(butter, uploaded, total);
    });

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

async function gitCommit(obj){
    if(!shell.which("git")){
        shell.echo("don't find git");
        return;
    }
    
    shell.exec("git add .");    
    
    //填写提交内容
    var msg = obj.message;
    if(obj.message == undefined){
        /*
            v0.2.4: windows系统cmd输入中文乱码;
        */         
        msg = await read("填写git commit message: ");
        console.log("msg", msg);
    }

    shell.exec("git commit -am " + msg);
    shell.exec("git push");
}

function gitPull(){
    if(!shell.which("git")){
        shell.echo("don't find git");
        return;
    }
    shell.exec("git pull");
}


async function read(message){
    // return readline.question(title)
    var response = await prompts({
        type: "text",
        name: "message",
        message: message
    });
    return response.message;
}

module.exports = init;