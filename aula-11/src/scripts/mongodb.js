// connect to mongodb via terminal
// mongo -u antony -p mysecretpass --authenticationDatabase heroes

//databases
// show dbs

//switching to heroes db
// use heroes

//show collections
// show collections

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
db.heroes.find().limit(1000).sort({name: -1})
db.heroes.findOne()

//update ONE, DELETES ALL DATA THAT WAS NOT CHANGED
db.heroes.update(
    {_id: ObjectId("5cb8ac46f61e59766c113546")},
    {name: "Wonder Woman"}
)
//update ONE WITHOUT deleting data
db.heroes.update(
    {_id: ObjectId("5cb8ac4bf61e59766c113547")},
    {$set: {name: "Wonder Woman"} }
)
//update ALL MATCHES WITHOUT deleting data 
db.heroes.update(
    { name: "Wonder Woman" },
    { $set: {name: "Captain Mavel"} },
    { multi: true }
)

//delete
db.heroes.remove() //this fails, can't "delete without where" like this
db.heroes.remove({}) //forces delete without where, because the condition is fullfilled
db.heroes.remove({name: "Flash"}) //removes all flash(es)


//counting
db.heroes.count()


// JS can be used in mongo
for(let ie = 1; ie <= 1001; ie++){
    db.heroes.insert({
        name:`Naruto Shadow Clone #${ie}`,
        power: `Chakra`,
        birthDate: `Today`
    })
}