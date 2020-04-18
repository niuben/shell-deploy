var file = require("./file");
var path = require("path");
var prompts = require("prompts");
var data = require("../config");

module.exports = {
      createStep: async function(index, onCancel){    
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
        }, {onCancel});
        
        if(response.step !== "finish" ){        
            options.push(response.step);
            options = options.concat(await this.createStep(++index, onCancel));
        }
        return options;
    },
    
    getStep: function(data, option){
        for (let i = 0; i < data.steps.length; i++) {
            const step = data.steps[i];
            if(step.type == option){
                return step;
            }
        }
    },
    
    getFilePath: function(fileName){
        return path.join(process.cwd(), fileName);
    },

    // 获取当前任务列表
    getDeployFilePath: function() {
        return this.getFilePath("deploy.json");
    },

    getDeploy: function(){
        var deployFilePath = this.getDeployFilePath();        
        return file.isExist(deployFilePath) ? JSON.parse(file.read(deployFilePath)) : data.deploy;    
    },
    // 判断deploy.json文件中是否存在taskname;
    isExitTaskName: function(name){
        var deploy = this.getDeploy();
        var isExist = false;
        deploy.actions.map((action)=>{
            if(action != null && action.name == name){
                isExist = true;
            }
        });
        return isExist;
    },
    // 获取package.json
    getPackageFilePath: function() {
        return this.getFilePath("package.json");
    },    
    getPackage: function(){
        var packageFilePath = this.getPackageFilePath();                
        return file.isExist(packageFilePath) ? JSON.parse(file.read(packageFilePath)) : {};    
    },
    // 判断package.json的script标签中是否存在任务名;
    isExistScriptName: function(name){
        var package = this.getPackage();
        if(package.scripts == undefined){
            return false;
        }

        var scripts = package.scripts;
        for(var scriptName in scripts){
            if(scriptName == name){
                return true;
            }
        }
        return false;
    }
}
