#!/usr/bin/env node 
module.exports = {    
    steps: [{
        "type": "upload",
        "host": "服务器地址（可以是IP地址）",
        "username": "用户名",
        "password": "密码",
        "path": "指定服务器路径",
        "source": "指定本地上传路径"
    },{
        "type": "command",
        "command": "填写命令名称(比如 npm run build)"
    },{
        "type": "copy",  
        "source": "需要复制文件和文件夹路径",
        "dest": "目标路径"
    },{
        "type": "delete",
        "path": "删除文件或者文件夹地址"
    },{
        "type": "cd",
        "path": "指定文件夹路径"
    },{
        "type": "git-pull",        
    },{
        "type": "git-commit",
        "message": "提交说明信息"        
    }],
    nameStep: {
        type: "text",
        name: "name",
        message: "任务名称: ",
    },    
    inforStep: {        
        type: "text",
        name: "infor",
        message: "任务描述: "
    },
    coverStep: {
        type: "confirm",
        name: "isCover",
        message: "任务名称已存在。是否覆盖?"
    },
    deploy: {   //整体配置
        actions:[]
    },
    filename: "deploy.json", //    
    initConf: {     //用户生成的配置文件
        name: "",
        infor: "",
        options: [],
        steps: []    
    }
}