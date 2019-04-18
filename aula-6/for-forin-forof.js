const service = require("./service")

async function main(){
    try{
        const result = await service.getPeople("a")
        const names = []

        console.time("forloop-time")
        for(let i = 0; i < result.results.length; i++){
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd("forloop-time")

        console.time("forinloop-time")
        for(let i in result.results){
            names.push(result.results[i].name)
        }
        console.timeEnd("forinloop-time")

        console.time("forofloop-time")
        for(pessoa of result.results){
            names.push(pessoa.name)
        }  
        console.timeEnd("forofloop-time")

        console.log("names", names)
    }catch(error){
        console.error("Internal error", error)
    }
}

main()