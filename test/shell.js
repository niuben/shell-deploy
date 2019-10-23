var shell = require("shelljs");
var readline = require("readline-sync");
var child_process = require("child_process");

var file = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);

var conf = JSON.parse(file.readFileSync(".deploy").toString());

// var name;
// var quest = readline.keyInYN("check quest?");
// console.log(quest); 

/*
*  read
*/ 


// var line1 = line.next();
// console.log(line.next());


// shell.cd("./test");
// shell.cp("-f", "./shell.js", "./shell1.js");

function init(obj){
    if(typeof obj.flow != "object"){
        return;
    }
    obj.flow.map(function(step){
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
    }
}
init(conf);

function scp(obj){
    try{
        console.log("正在上传文件....")
        child_process.execFileSync("./test/pscp.exe", ["-l", obj.user, "-pw", obj.password, "-r", obj.source, obj.ip + ":" + obj.path]);
        console.log("上传文件成功!")
    }catch(e){
        console.log("上传失败");
    }
}

function gitCommit(obj){
    if(!shell.which("git")){
        shell.echo("don't find git");
        return;
    }
    shell.exec("git add .");    

    var msg = obj.content;
    if(obj.content == undefined){
        msg = read("Write commit message: ");
    }

    shell.exec("git commit -am '" + msg + "'");
    shell.exec("git push");
}

// 
function confim(){

}

function read(title){
    return readline.question(title)
}

// console.log(command);
