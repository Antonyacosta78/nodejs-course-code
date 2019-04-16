const {deepEqual, equal} = require("assert")
const PostgreSQL = require("./../db/strategies/PostgreSQL")
const Context = require("./../db/strategies/common/ContextStrategy")

const context = new Context(new PostgreSQL())

const DEFAULT_HERO = {
    name: "Wolverine",
    power: "Adamantium skeleton and Regeneration"
}

describe("PostgreSQL Strategy", () => {
    this.timeout = Infinity


    it("Should Connect to Database", async () => {
        await context._connect() //for test purposes only, this is a private method and should not be used outside the class
        const result = await context.isConnected()
        equal(result, true)
    })

    it("Should register a hero in the Database", async () => {
        const result = await context.create(DEFAULT_HERO)
        if(result.id){
            delete result.id //deleting id for matching the default object
        }
        deepEqual(result, DEFAULT_HERO)
    })

    it('Should list the hero in the database based on his name', async () => {
        const [result] = await context.read({name: DEFAULT_HERO.name}) // read returns a array, picking only the first element
        if(result.id){
            delete result.id //deleting id for matching the default object
        }
        deepEqual(result, DEFAULT_HERO)
    })

    it("Should update a hero's Information in the database", async () => {
        const [beforeUpdateObject] = await context.read({name: DEFAULT_HERO.name})
        const [affectedRows, result] = await context.update(beforeUpdateObject.id, {name: "Lobezno"})
        if(result.id){
            delete result.id //deleting id for matching the default object
        }
        deepEqual(result, {...DEFAULT_HERO, name: "Lobezno"})
    })

    it("Should delete a hero by id in the database", async () => {
        const [hero] = await context.read(DEFAULT_HERO)
        const result = await context.delete(hero.id)
        console.log("Deleting...", hero)
        console.log("Delete result:", result)
        deepEqual(result, 1)
    })

})