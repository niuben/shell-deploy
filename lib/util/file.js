// var JSON = require("json");
var fs = require('fs');

function createFile(path, content){    
    return fs.writeFileSync(path, content);
};

function readFile(path, optin) {
    var buf = fs.readFileSync(path);    
    return buf.toString();
}

function getFileType(fileName) {
    var fileNameArr = fileName.split('.');
    return fileNameArr[fileNameArr.length - 1];
}

function getPrevFileName(fileName) {
    var fileNameArr = fileName.split('.');
    if(fileNameArr.length > 1){
        fileNameArr.pop();
    }
    return fileNameArr.join(".");
}

function getFileName(path){
    var pathArr = path.split('/');
    return pathArr[pathArr.length - 1];
}

function isExist(path){
    return fs.existsSync(path);
}

function isImage(imgName){
    if(imgName.indexOf(".") == -1){
        return false;
    }

    var imgNameArr = imgName.split(".");
    var imgType = imgNameArr[imgNameArr.length - 1];
    var imgTypeList = ["png", "jpg", "jpeg", "gif", "bmp"];
    
    imgType = imgType.toLowerCase();
    if(imgTypeList.indexOf(imgType) == -1){
        return false;
    }
    return true;
} 

function toBase64(imgFileUrl){
    var imgContent = fs.readFileSync(imgFileUrl);
    return "data:image/png;base64," +  new Buffer(imgContent).toString("base64");
}

module.exports = {
    create: createFile,
    read: readFile,
    getType: getFileType,
    getName: getFileName,
    getPrevName: getPrevFileName,
    isExist: isExist,
    isImage: isImage,
    toBase64: toBase64
}