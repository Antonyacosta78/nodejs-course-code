const Mongoose = require('mongoose')
const credentials = {
    user: "antony",
    password: "mysecretpass",
    host: "localhost",
    port: "201",
    db: "heroes"
}

Mongoose.connect(
    `mongodb://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.db}`,
    { useNewUrlParser: true },
    function (error) {
        if (!error) return;
        console.error(`[CONNECTIONERROR]`, error)
    }
)

const conn = Mongoose.connection
conn.once('open', () => console.log("Sucessfully connected to Database, State:", conn.readyState))

const HeroSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const HeroModel = new Mongoose.model("hero", HeroSchema);

async function main() {
    const registerResult = await HeroModel.create({
        name: "Stan Lee",
        power: "God creator of the universe",
    })

    console.log("Done Boiii", registerResult)

    const listItems = await HeroModel.find()
    console.log("Items in DB", listItems)

}

main();