const Sequelize = require('sequelize')

const Driver = new Sequelize(
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

async function main(){
    try {
        const Heroes = Driver.define("heroes",{
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

        await Heroes.sync();
        // await Heroes.create({
        //     name: "Green Lantern",
        //     power: "Lantern Ring"
        // });
        const result = await Heroes.findAll({raw: true})

        console.log("result", result)

    } catch (error) {
        console.log("[ERROR]: ", error)
    }

}

main()