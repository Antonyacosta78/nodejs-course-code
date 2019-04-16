// connect to mongodb via terminal
// mongo -u antony -p mysecretpass --authenticationDatabase heroes

//databases
show dbs

//switching to heroes db
use heroes

//show collections
show collections

//if needed, auth inside mongodb
db.auth({
    user: "antony",
    pwd: "mysecretpass"
})

//inserting data
db.heroes.insert({
    name: "Flash",
    power: "Speed",
    birthDate: "1998-01-01"
})

//select
db.heroes.find()
db.heroes.find().pretty()

// JS can be used in mongo

for(let ie = 1; ie <= 1001; ie++){
    db.heroes.insert({
        name:`Naruto Shadow Clone #${ie}`,
        power: `Chakra`,
        birthDate: `Today`
    })
}