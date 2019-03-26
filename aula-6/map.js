const service = require("./service")

Array.prototype.myMap = function(callback){
    const newMappedArray = []
    for(let i = 0; i<this.length; i++){
        newMappedArray.push(callback(this[i], i))
    }
    return newMappedArray
}


async function main(){
    try{
        const result = await service.getPeople("e")

        // result.results.forEach(elem => {
        //     names.push(elem.name)
        // })

        // const names = result.results.map(elem => elem.name)

        const names = result.results.myMap((elem,i) => `${elem.name} ${i}`)


        console.log("nomes", names)
    }catch(e){
        console.error("Error", e)
    }
}

main()