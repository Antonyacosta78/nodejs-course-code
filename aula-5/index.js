const EventEmitter = require("events");

/* MyEmitter Class */
class MyEmitter extends EventEmitter{

}

const myEmitter = new MyEmitter();
const eventName = "user:click";

myEmitter.on(eventName, function(click){
    console.log("an user has clicked ", click);
});

// let count = 0;

// setInterval(() =>{
//     myEmitter.emit(eventName, "ok " + (++count));
// }, 2000)

// myEmitter.emit(eventName, "RollBar");
// myEmitter.emit(eventName, "ok");

const stdin = process.openStdin();

function main(){
    return new Promise((resolve, reject) =>{

        stdin.addListener("data", function(val){
            // console.log(`Tu escreveu ${val.toString().trim()}`);
            return resolve(val.toString().trim());
        });

    })
}
main().then(function(res){
    console.log(res);
});