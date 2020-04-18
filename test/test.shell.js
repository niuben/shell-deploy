var argvArr = process.argv;
var argv = argvArr[argvArr.length - 1];

console.log(argv);
var shell = require("../lib/shell");
shell(argv);
console.log(process.cwd());