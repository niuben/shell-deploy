## shell-deploy
使用配置文件完成代码部署

### 快速开始
按照模块
```js
npm add shell-deploy
```

在项目根目录创建`.deploy`配置文件，
```
{
    "preview":[{
        "type": "command",
        "command": "yarn run test"
    },{
        "type": "upload",
        "ip": "10.152.81.208",
        "user": "root",
        "password": "8k9l0;-'",
        "path": "/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/",
        "source": "./test/test1"
    }], 
    "online": [{
        "type": "copy",
        "source": "./test/test1/a.js",
        "dest": "./test/test2"
    },{
        "type": "git-commit"    
    }],    
}
```


