#!/usr/bin/env node 
var path = require("path");
var prompts = require("prompts");
var data = require("./config");
var file = require("./util/file");
var common = require("./util/common");

async function create(){
                
    function onCancel(){
        console.log("创建任务被取消");
        process.exit();        
    }
    
    //填写任务名称
    var conf = data.initConf;    
    conf = Object.assign({}, conf, await prompts(data.nameStep, {onCancel}));            
    conf.name = conf.name.replace(" ", ""); //v0.2.4: 有时候输入会有空格，去掉首尾空格;    
    
    // 增加覆盖任务提醒;
    if(common.isExitTaskName(conf.name) || common.isExistScriptName(conf.name)){
        var coverObj = Object.assign({}, await prompts(data.coverStep, {onCancel}));
        if(coverObj.isCover == false){
            create();
            return;
        }
    }

    // 填写任务描述;
    conf = Object.assign({}, conf, await prompts(data.inforStep, {onCancel}));

    // 选择任务;
    conf.options = await common.createStep(1, onCancel);
    

    //生成配置文件，将选项的值写入模板中;
    conf.options.map(function(option){
        conf.steps.push(common.getStep(data, option));
    });
    
    delete conf.options;    
    
    /*
    * 判断之前是否已经有了配置文件？
    * 如果之前有配置文件，直接在之前的基础上添加;
    * 如果之前没有配置文件，则使用默认数据;
    */        
    var deploy = common.getDeploy();
    var unionActions = [];
    deploy.actions.map(function(action){
        if(action != null && action.name != conf.name){
            unionActions.push(action);
        }
    });
    unionActions.push(conf);
    deploy.actions = unionActions;
    

    var deployFilePath = common.getDeployFilePath();
    file.create(deployFilePath, JSON.stringify(deploy, null, 2));
    console.log(!file.isExist(deployFilePath) ? "创建配置文件成功" : "更新配置文件成功");
    
    /*
    * 2020/2/18: 修改package.json文件;    
    */ 
    var packagePath = common.getPackageFilePath();
    if(file.isExist(packagePath)){
        var package = JSON.parse(file.read(packagePath));
        package.scripts = package.scripts == undefined ? {} : package.scripts;                
        package.scripts[conf["name"]] = `npx shell-deploy ${conf["name"]}`;
        file.create(packagePath, JSON.stringify(package, null, 2));
    }
    console.log(`设置${conf["name"]}命令成功`);
    
    /* 
    * 2020/3/4: 完善文案引导,
    */ 
    console.log("下面步骤:");
    console.log(`1.完善配置项,点击编辑: ${path.join(process.cwd(), "deploy.json")}`);
    console.log(`2.执行npm run ${conf["name"]} 或者 yarn run ${conf["name"]}命令` );

}

/*
* 创建第一步
*/ 
module.exports = create;