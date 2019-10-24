## shell-deploy
使用配置文件完成代码部署

### 快速开始
使用`shell-deploy`模块分为三步
1. 安装模块
2. 创建`.deploy`配置文件
3. 设置部署命令
4. 执行部署命令


#### 1.安装模块
```js
npm add shell-deploy
```

#### 2.创建`.deploy`配置文件

在项目根目录创建`.deploy`配置文件，通过部署会涉及到多个场景，比如部署测试环境、部署线上环境等;  

每个场景都是一个`key/value`形式，`key`是场景名称，`value`是一个数组包含部署每一个步骤;
比如下面配置文件，有`preview`和`online`两个场景;
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

#### 3.设置部署命令

在`package.json`文件的`script`对象中增加部署命令

```
{
    ...
    script: {
        "preview": "npx shell-deploy preview",
        "online": "npx shell-deploy online"
    }
    ...  
}
```

#### 4.执行部署命令

运行
```js
npm run preview //部署到预览环境
npm run online //部署到预览环境
```


### API描述

API列表:
* upload
* command
* copy
* cd 
* git-pull
* git-commit

#### upload
将文件上传到服务器上, 对应字段如下
* host: 服务器地址（可以是IP地址）
* username: 用户名
* password: 密码
* path: 指定服务器上传路径
* source: 需要上传的文件路径

```js
{
    "type": "upload",
    "host": "10.152.81.208",
    "username": "root",
    "password": "8k9l0;-'",
    "path": "/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/",
    "source": "./test/test1"
}
```

#### command 
需要执行的命令
* command: 命令名称

```js
{
    "type": "command",
    "command": "yarn run test"
}
```

#### copy
复制文件和文件夹

* source: 需要复制文件和文件夹路径
* dest: 目标路径

```js
{
    "type": "copy",  
    "source": "./test/test1/a.js",
    "dest": "./test/test2"
}
```

#### cd
进入指定文件夹路径
* path: 指定文件夹路径

```js
{
    "type": "cd",
    "path": "../test/" 
}
```

#### git-pull
通过`git pull`拉取代码

```js
{
    "type": "git-pull"
}
```

#### git-commit 
通过`git commit`提交代码

* content: 提交的文案; 如果这个字段不存在，会自动提示填写字段;
```js
{
    "type": "git-commit"
    "content": "修改xxx文件"
}
```
