# shell-deploy
快速创建和执行一个自动化任务。

自动化任务是由一些列动作组成的，常见的动作有复制、删除、上传等等。通过执行自动化任务可以大幅度提高开发效率。

开发中经常会用到`shell`来做一些自动化任务,常见自动化任务有部署测试机、文件操作等等。不过`shell`具有众多版本、有些功能需要安装特定模块等问题，我们需要通过`node`代替`shell`。

`shell-deploy`通过可视化来选择每一步动作，再将每一步动作按照前后顺序组成一个自动化任务，最后将自动化转化成一个`deploy.json`配置文件并创建一个执行命令。

通过编辑`deploy.json`配置文件来完善每一步动作内容，通过`npm run`来运行自动化任务。

当一个项目有多人参与开发时，`shell-deploy`通过任务名称给每个人创建独立任务。每个人根据开发环境和习惯不同来创建自己的自动化任务，从而提高整个团队开发效率。  



## 快速开始

使用`shell-deploy`模块分为三步

1. 安装模块
2. 创建任务
3. 执行任务

#### 1.安装模块

```js
npm install shell-deploy
```

或者
```js
yarn add shell-deploy
```

#### 2.创建任务

执行创建命令

```js
npx shell-deploy -c
```

或者

```js
npx shell-deploy --create
```

按照命令选择每一步内容

最终会生成一个`deploy.json`的配置文件, 同时会在`package`中创建相应的命令;

比如创建一个名字叫`preivew`上传文件到服务器的任务  

![演示gif图-w100%](http://img03.sogoucdn.com/app/a/11220004/821a4af0a8b352b13e31e611ce902d77.gif)


#### 3.执行任务
通过`npm run`或者`yarn run`方法执行相应任务名称

比如执行`preview`任务
```js
npm run preview //上传文件到服务器
```
或者
```js
yarn run preview //上传文件到服务器
```

![演示gif图-w100%](http://img03.sogoucdn.com/app/a/11220004/b78af09722f3c9e8703646b9b80b1f57.gif)
  
  

## 配置文件说明

第一次创建任务时会生成一个`deploy.json`配置文件，再次创建任务时会自动将任务添加到配置文件中, 所以`deploy.json`配置文件中会包含多个任务。

每个任务都有一个`Object`对象，它具有三个属性: 
* name: 任务名称;
* infor: 任务描述;
* steps: 动作步骤;

比如这是一个`preview`任务，主要功能是部署到服务器。这个任务具有两个步骤：执行命令和上传服务器。
```js
{
    "name": "preview",
    "infor": "部署到服务器",
    "steps": [{
        "type": "command",
        "command": "yarn run build"
    },{
        "type": "upload",
        "host": "10.150.100.100",
        "username": "root",
        "password": "****",
        "path": "/usr/server/nginx/staic/",
        "source": "./build/"
    }]
}    
```
  


## 动作列表:

目前`shell-deploy`具有7个常见动作，通过这些工作不同顺序组合可以创建出很多任务。下面是每个动作API介绍。

- upload
- command
- copy
- cd
- delete
- git-pull
- git-commit

通用字段：

- title: 说明当前步骤是什么

#### upload

将文件上传到服务器上

- host: 服务器地址（可以是 IP 地址）
- username: 用户名
- password: 密码
- path: 指定服务器上传路径
- source: 本地上传文件路径

比如将`build`文件夹整体上传到服务器`/usr/server/nginx/staic/`路径下（提醒：会生成build文件夹）
```js
{
    "type": "upload",
    "host": "10.150.100.100",
    "username": "root",
    "password": "****",
    "path": "/usr/server/nginx/staic/",
    "source": "./build/"
}
```


比如将`build`文件夹下所有文件上传到服务器`/usr/server/nginx/staic/test`路径下（提醒：不会生成build文件夹, 如果服务器上没有`test`文件夹会自动生成）
```js
{
    //.....
    "path": "/usr/server/nginx/staic/test",
    "source": "./build/*"
}
```

#### command

需要执行的命令

- command: 命令名称

比如执行`npm run build`命令
```js
{
    "type": "command",
    "command": "npm run build"
}
```

#### copy

复制文件和文件夹

- source: 需要复制文件和文件夹路径
- dest: 目标路径

比如拷贝`a.js`文件到`./dest/`路径下 (提示：如果没有dest文件夹会自动创建一个)
```js
{
    "type": "copy",
    "source": "./test/a.js",
    "dest": "./dest/"
}
```

比如拷贝`test`整个文件夹到`./dest/`路径下 (提示：如果没有dest文件夹会自动创建一个)
```js
{
    "type": "copy",
    "source": "./test",
    "dest": "./dest/"
}
```

#### cd

进入指定文件夹路径

- path: 指定文件夹路径

比如cd到`./test/`文件夹下
```js
{
    "type": "cd",
    "path": "./test/"
}
```

#### delete

删除指定文件或者文件夹

比如删除`a.js`文件
```js
{
    "type": "delete",
    "path": "./test/a.js"
}
```


#### git-pull

通过`git pull`拉取代码

比如拉取代码
```js
{
    "type": "git-pull"
}
```

#### git-commit

通过`git commit`提交代码

- message: 提交的文案; 如果这个字段不存在，会自动提示填写提交信息;

比如提交代码
```js
{
    "type": "git-commit"
    "message": "修改xxx文件"
}
```

## 文件监听和定时执行任务

有些时候需要自动执行任务，比如文件发生变化或者定时执行。通过使用`chokidar`和`croncli`两个模块来完成。

通过[chokidar-cli](https://www.npmjs.com/package/chokidar-cli)模块指定监听的文件，当文件变化时执行任务。比如：

比如监听js文件变化，当js文件变化时执行任务
```js
chokidar "src/*.js" -c "npm run preview"
```

通过[croncli](https://www.npmjs.com/package/croncli)模块创建定时任务,当时间到了以后执行任务

比如每分钟执行自动化任务
```js
croncli -s "0 * * * * *" -c "npm run preview"
```





