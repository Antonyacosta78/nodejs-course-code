#!/usr/bin/env node

const Commander     = require("commander")
const FileHandler   = require("./FileHandler")
const Hero          = require("./Hero")

async function main(){
    Commander
    .command('help')
    .description('display verbose help')
    .action(function() {
        console.log(
`---------------------------------------------------------------------------------------
Welcome to the Hero Manipulation CRUD, here you can save heroes information in files
Usage: [command] [options]
---------------------------------------------------------------------------------------
Available Commands: 
    [create]:    Register a hero's information.
            Required Params: -n, --name: Hero's name / -p, --power: Hero's power
            Optional Params: -i, --id: Hero's IDentificator

    [read]:      Read a hero's information or List all heroes registered
            Optional Params: -i, --id: Hero's IDentificator

    [update]:    Update a hero's information
            Required Params: -i, --id: Hero's IDentificator
            Optional Params: -n, --name: Hero's name / -p, --power: Hero's power

    [delete]:    Delete a hero's information
            Required Params: -i, --id: Hero's IDentificator
            `
            )
    });

    Commander
    .command('create')
    .description(" Register a hero's information.")
    .action(async ()=>{
        try {
            const data = new Hero(Commander)
            console.log("Given Data:", data)
            console.log("Processing...")

            if(typeof data.name !== "string" && typeof data.power !== "string"){
                throw Error("Missing important data: name and power")
            }
            const response = await FileHandler.registerHero(data);
            if(!response){
                throw Error(`Register Failed, Response: ${response}`);
            }

            console.log(`Success! Hero's id: ${response}`);
            return true;

        } catch (error) {
            console.log("[ERROR]", error)
            return false;
        }
    })
    
    Commander
    .command('read')
    .description("Read a hero's information or List all heroes registered")
    .action(async () => {
        try {
            const id = Commander.id;
            const msg = (typeof id === "string") ? `ID given: ${id}` : "No ID given";
            console.log(msg)

            const result = await FileHandler.list(id);

            if(result === null){
                console.log(`No hero found for id: ${id}`)
                return false;
            }else{
                if(Array.isArray(result)){
                    console.log(`Success!: Heroes Info`)
                    for(row of result){
                        console.log("-------------")
                        console.log(`Name: ${row.name} | Power: ${row.power} | ID: ${row.id}`)
                    }
                }else{
                    console.log(`Success!: Hero's Info::  Name: ${result.name} | Power: ${result.power} | ID: ${result.id}`)    
                }
                return true;
            }

        } catch (error) {
            console.log("[ERROR]", error)
            return false;
        }
    })

    Commander
    .command('update')
    .description("Update a hero's information")
    .action(async ()=> {
        try {
            const data = new Hero(Commander)
            if(typeof data.id !== "string"){
                throw Error("ID not given")
            }
            const response = await FileHandler.updateHero(data.id, data)
            console.log(`Success! Hero's updated Data:: ID: ${response.id} | Name: ${response.name} | Power: ${response.power}`)
            return true

        } catch (error) {
            console.log("[ERROR]", error)
            return false
        }
    })

    Commander
    .command('delete')
    .description("Delete a hero's information")
    .action(async ()=>{
        try {
            const id = Commander.id;
            if(typeof id !== "string"){
                throw Error("ID not given")
            }
            const response = await FileHandler.deleteHero(id)
            console.log("Success! Deleted data:", response)
            return true;

        } catch (error) {
            console.log("[ERROR]", error)
            return false
        }
    })

    Commander
    .version("v1")
    .usage("[command] [options]")
    .option("-n, --name [value]", "Hero's Name")
    .option("-p, --power [value]", "Hero's power")
    .option("-i, --id [value]", "Hero's id")
    .parse(process.argv)


}


main()
