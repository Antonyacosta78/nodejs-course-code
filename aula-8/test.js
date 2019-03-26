const {
    deepEqual,
    ok
} = require("assert")

const FileHandler = require("./FileHandler")


const DEFAULT_ITEM = {
    "id" : 1,
    "name":"Flash",
    "power":"Super Speed"
}

describe("Hero CRUD", () => {
    before(async () => {
        await FileHandler.writeToFile([])
        await FileHandler.registerHero(DEFAULT_ITEM)
    })

    it("Should list a hero based on its id within files", async () => {
        const expected = DEFAULT_ITEM  
        const response = await FileHandler.list(expected.id)
        deepEqual(response, expected)
    })

    it("Should register a hero's data in a file", async () => {
        const curdate = Date.now()
        const expected = {
            ...DEFAULT_ITEM,
            id: curdate
        }
        const response = await FileHandler.registerHero(expected)
        const actual = await FileHandler.list(response);
        deepEqual(actual, expected)
    })

    it("Should update hero's information in a file", async () => {
        const expected = {
            id: DEFAULT_ITEM.id,
            name: "Batman",
            power: "Money"
        }
        const updateData = {
            name: "Batman",
            power: "Money"
        }
        const response = await FileHandler.updateHero(expected.id, updateData)

        deepEqual(expected, response)
    })

    it("Should delete a hero's information in a file", async () => {
        const expected = [{
            "id":1,
            "name":"Batman",
            "power":"Money"
        }]
        const response = await FileHandler.deleteHero(DEFAULT_ITEM.id)

        deepEqual(expected, response)
    })
    
})
