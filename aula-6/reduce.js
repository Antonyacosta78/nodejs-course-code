const {getPeople} = require("./service")

Array.prototype.myreduce = function(callback, initVal){
    if(initVal == undefined && this.length == 0){
        throw new TypeError("Thats bad pal, no init val and empty array")
    }

    let cache = this.map(e=>e);
    
    if(initVal == undefined){
        initVal = cache[0];
        delete cache[0];
    }

    for(i in cache){
        if(typeof cache[i] === "undefined" && this[i] !== cache[i] && i == 0) continue;
        if(typeof this[i] === "function") continue;
        initVal = callback(initVal, this[i], i, this)
    }
    return initVal
}

async function main(){
    try {
        const {results} = await getPeople("i")

        const heights = results.map(item => parseFloat(item.height))

        // const total = heights.reduce((prev, next) => prev+next , 0) //first parameter is callback, second parameter is initial value

        // const total = heights.myreduce((prev, next) => prev+next ) //first parameter is callback, second parameter is initial value

        const myList = [
            ["Arthur","das favela"],
            ["cult", "play 4 y trabajo o pizza"]
        ]

        const total = myList.myreduce( (prev, next)=> prev.concat(next), []).join(", ")

        console.log("Total", total)

    } catch (error) {
        console.log("Error", error)
    }
}

main()