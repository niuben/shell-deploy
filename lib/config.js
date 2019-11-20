module.exports = {    
    steps: [{
        "type": "command",
        "command": "填写命令名称"
    },{
        "type": "upload",
        "ip": "服务器地址（可以是IP地址）",
        "user": "用户名",
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
    }],
    deploy: {
        actions:[]
    },
    filename: "deploy.json"
}