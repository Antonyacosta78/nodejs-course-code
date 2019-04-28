const ICrud = require("./common/interfaceCrud")
const Mongoose = require("mongoose")

class MongoDB extends ICrud {
    constructor() {
        super()
        //login credentials here
        this.auth = {
            user: "antony",
            pwd: "mysecretpass",
            host: "localhost",
            port: "201",
            db: "heroes"
        }
        this._hero = null
        this._conn = null
    }

    async _defineModel(){
        if(this._hero = null) {
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
            this._hero = new Mongoose.model("hero", HeroSchema);
        }
    }

    async connect() {
        //just have to set the connection if null or not connected
        if(this._conn == null || this._conn.readyState !== 1){
            //we await for it to connect, so _conn.readyState 2 (Connecting) should never happen, i hope...
            await Mongoose.connect(
                `mongodb://${this.auth.user}:${this.auth.pwd}@${this.auth.host}:${this.auth.port}/${this.auth.db}`,
                { useNewUrlParser: true },
                (err) => {
                    if (!err) return;
                    throw new Error(err);
                }
            )
            this._conn = Mongoose.connection
            this._conn.once('open', () => console.log("Connected to MongoDB"))
            return this._conn.readyState;
        }
    }

    create(item) {
        console.log(`Item saved on MongoDB Database`)
    }

    async disconnect() {
        this._conn.close()
    }

    isConnected() {
        return this._conn.readyState === 1;
    }
    
}

module.exports = MongoDB