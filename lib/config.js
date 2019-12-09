#!/usr/bin/env node 

module.exports = {    
    steps: [{
        "type": "command",
        "command": "填写命令名称"
    },{
        "type": "upload",
        "host": "服务器地址（可以是IP地址）",
        "username": "用户名",
        "password": "密码",
        "path": "指定服务器上传路径",
        "source": "本地的文件路径"
    },{
        "type": "copy",  
        "source": "需要复制文件和文件夹路径",
        "dest": "目标路径"
    },{
        "type": "cd",
        "path": "指定文件夹路径"
    },{
        "type": "git-pull"        
    },{
        "type": "git-commit",
        "message": "提交说明"
    },{
        "type": "delete",
        "path": "删除文件或者文件夹地址"
    }],
    deploy: {
        actions:[]
    },
    filename: "deploy.json"
}