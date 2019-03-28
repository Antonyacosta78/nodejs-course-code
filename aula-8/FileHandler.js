const { readFile, writeFile } = require("fs")
const { promisify } = require("util")

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class FileHandler{

    constructor(){
        this.FILENAME = "heroes.json"
    }
    
    async writeToFile(data){
        await writeFileAsync(this.FILENAME, JSON.stringify(data))
        return true
    }

    async registerHero(hero){
        const filedata = await this.getFileData()
        if(typeof hero.id == "undefined"){
            hero.id = Date.now()
        } 
        filedata.push(hero)

        const result = await this.writeToFile(filedata)
                    
        if(result){
            return hero.id
        }
        return result
    }
    
    async updateHero(heroid, updateData){
        const allData = await this.getFileData()

        for(let i in allData){
            if(heroid == allData[i].id){
                allData[i] = {
                    ...allData[i],
                    ...updateData
                }
                await this.writeToFile(allData)
                return await this.list(heroid)
            }
        }

        throw Error(`No Hero with id ${heroid} found`); //if loops throught entire file not finding the hero, can`t be updated

    }

    async deleteHero(heroid){
        const allData = await this.getFileData()

        const index = allData.map(e=>e.id).indexOf(heroid)
        if(index == -1){
            throw Error("There is no hero with that index")
        }

        const removed = allData.splice(index, 1)
        
        await this.writeToFile(allData)
        return removed;
    }

    async getFileData(){
        const FILE = await readFileAsync(this.FILENAME, "utf8")
        return JSON.parse( FILE.toString() )
    }
    
    async list(id = null){
        const rawdata = await this.getFileData()
        if(id !== null && typeof id !== "undefined"){

            for(let i in rawdata){
                if(id === rawdata[i].id){
                    return rawdata[i]
                }
            }
            
            return null
        }
    
        return rawdata
    }
}

module.exports = new FileHandler()