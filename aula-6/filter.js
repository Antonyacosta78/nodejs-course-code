const {getPeople} = require("./service")
/* 
const item = {
    "name": "Antony",
    "age": 15
}

const {name} = item

*/
Array.prototype.myfilter = function(callback){
    const resultArray = []
    for(index in this){
        if (callback(this[index], index, this)){
            resultArray.push(this[index])
        }
    }
    return resultArray
}


async function main(){
    try {
        const {results} = await getPeople("o")

        // const larsFamily = results.filter((e) => {
        //     //if return true == keeps, false == ignore
        //     //String.prototype.indexOf() searches for the index where the parameter is found, -1 is returned if not found
        //     return (e.name.toLowerCase().indexOf("lars") !== -1) ? true : false;
        // })
        
        const larsFamily = results.myfilter((e) => 
            e.name.toLowerCase().indexOf("fett") !== -1
        )

        const larsNames = larsFamily.map( e => e.name )

        console.log("All results", results.map(e=>e.name))
        console.log("Fett Family Members", larsNames)

    } catch (error) {
        console.error("Error", error)
    }

}

main()