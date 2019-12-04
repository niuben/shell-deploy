#!/usr/bin/env node 

var prompts = require("prompts");
var data = require("./config");
var file = require("./util/file");

var conf = {
    name: "",
    infor: "",
    options: [],
    steps: []    
};

var firstStep = [{
    type: "text",
    name: "name",
    message: "给部署起一个名字？"
},{
    type: "text",
    name: "infor",
    message: "给部署起一个描述？（比如部署到开发机）"
}];


async function createStep(index){
    // var index = conf.options.length + 1;
    var options = [];
    var response = await prompts({
        type: "select",
        name: "step",
        message: `第${index}步选择要做什么？`,
        choices: [
            { title: 'upoload: 上传文件到服务器', value: 'upload' },
            { title: 'cd: 到指定目录', value: 'cd' },
            { title: 'copy: 复制文件或文件夹', value: 'copy' },
            { title: 'delete: 删除文件或文件夹', value: 'delete' },
            { title: 'command: 执行命令', value: 'command' },
            { title: 'git commit: 提交代码', value: 'git-commit' },
            { title: 'git pull: 拉取代码', value: 'git-pull' },
            { title: "结束", value: "finish"}
        ]
    });
    
    if(response.step !== "finish" ){        
        options.push(response.step);
        options = options.concat(await createStep(++index));
    }
    return options;
}


/*
* 创建第一步
*/ 
module.exports = async ()=> {
    
    function getStep(option){
        for (let i = 0; i < data.steps.length; i++) {
            const step = data.steps[i];
            if(step.type == option){
                return step;
            }
        }
    }
    
    //执行第一步
    conf = Object.assign({}, conf, await prompts(firstStep));   
    conf.name = conf.name.replace(" ", ""); //v0.2.4: 有时候输入会有空格，去掉首尾空格;
    conf.options = await createStep(1);

    //生成配置文件;
    conf.options.map(function(option){
        conf.steps.push(getStep(option));
    });
    
    delete conf.options;
    
    /*
    * 判断之前是否已经有了配置文件？
    * 如果之前有配置文件，直接在之前的基础上添加;
    * 如果之前没有配置文件，则使用默认数据;
    */    
    var filename = "./deploy.json";
    var deploy = file.isExist(filename) ? JSON.parse(file.read(filename)) : data.deploy;    
        
    deploy.actions.push(conf);
    file.create(filename, JSON.stringify(deploy, null, 2));
    
    
    /*
    * 修改package.json文件;
    */ 
    var packageFileName = "./package.json";
    if(file.isExist(packageFileName)){
        var package = JSON.parse(file.read(packageFileName));
        package.scripts = package.scripts == undefined ? {} : package.scripts;
        package.scripts[conf["name"]] = `npx shell-deploy ${conf["name"]}`;
        file.create(packageFileName, JSON.stringify(package, null, 2));
    }

}