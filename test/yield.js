/*
    怎么做个延迟器: 当需要延迟的时候，整个代码不继续往下走;    
    如何让用户输入和延迟器联系起来，当有用户输入时手动阻止promise
    使用
*/
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
    setTimeout(function(){
        isSleep = false;
        sleepEnd();
    }, 50);

    console.log("start");
    yield sleep(function(){
        return isSleep;
    });
    console.log("end");    
} 
var iterator = readline(function(){
    iterator.next();
    // iterator.next();
});
var sleeping = iterator.next();

// iterator.next();
// var appleStore = countAppleSales(); // Generator { }
// console.log(appleStore.next()); // { value: 3, done: false }
// console.log(appleStore.next()); // { value: 7, done: false }
// console.log(appleStore.next()); // { value: 5, done: false }
// console.log(appleStore.next()); // { value: undefined, done: true }