#!/usr/bin/env node 

var create = require("./create");
var shell = require("./shell");

var argvArr = process.argv;
var argv = argvArr[argvArr.length - 1];

// console.log(argv);
if(argv == "--create"){
    create(argv);
}else{
    shell(argv);
}