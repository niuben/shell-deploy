const prompts = require('prompts');

/*
    怎么做个延迟器: 当需要延迟的时候，整个代码不继续往下走;    
    如何让用户输入和延迟器联系起来，当有用户输入时手动阻止promise
    使用
*/ 


const questions = [
  {
    type: 'text',
    name: 'dish',
    message: 'Do you like pizza?'
  },
  {
    type: prev => prev == 'pizza' ? 'text' : null,
    name: 'topping',
    message: 'Name a topping'
  }
];


// function* readline(){
//     var show = async function(){
//         return await prompts(questions);
//     }
//     yield show();
// }
// var iterator = readline();
// iterator.next();


var readline = function *(sleepEnd){
    var sleep = async function(getSleep){
        return await new Promise(function(resolve, reject){
            function check(){
                if(getSleep() == false){                        
                    resolve();
                    clearInterval(handle);
                }                
            }                
            var handle = setInterval(check, 50);
            check();
        });
    }
    
    var isSleep = true;
    // setTimeout(function(){
    //     isSleep = false;
    //     sleepEnd();
    // }, 50);
    prompts(questions).then(function(msg){        
        isSleep = false;
        sleepEnd(msg);
    })
    
    yield sleep(function(){
        return isSleep;
    });
    
} 
var iterator = readline(function(msg){
    console.log("msg", msg);
    iterator.next();
    
});
var sleeping = iterator.next();
console.log(123);
