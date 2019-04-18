const ICrud = require("./common/interfaceCrud")
const Sequelize = require('sequelize')

class PostgreSQL extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._heroes = null
        
    }

    async isConnected(){
        try {
            if(this._driver == null){
                return false
            }

            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.error("[DBCONNECTION Error]: ", error)
            return false;
        }
    }

    async _defineModel(){
        if(this._heroes == null) {
            this._heroes = this._driver.define("heroes",{
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    required: true
                },
                power: {
                    type: Sequelize.STRING,
                    required: true
                }
            },   {
                tableName: "HEROES",
                freezeTableName: false,
                timestamps:false
            })
        }

        return await this._heroes.sync()
    }
    
    async connect(){

        if(this._driver == null){
            this._driver = new Sequelize(
                'heroes', 
                'antony', 
                'mysecretpass', 
                {
                    host: "localhost",
                    dialect: "postgres",
                    quoteIdentifiers: false,
                    operatorAliases: false
                }
            )
            
        }
        return await this._defineModel()

    }

    async create(item){
        try {
            // await this.connect()
            const {
                dataValues
            } = await this._heroes.create(item)

            return dataValues

        } catch (error) {
            console.error("Error Registering Hero: ", error)
            return false
        }
    }

    async read(item = {}){
        return this._heroes.findAll({where: item, raw: true})
    }

    async update(id, item){
         const [affectedRows, rawData] = await this._heroes.update(item, {where: {id:id}, returning: true })
         return [affectedRows, rawData[0].dataValues]
    }
    
    async delete(id){
        return this._heroes.destroy({where: {id}})
    }

}


module.exports = PostgreSQL