const {deepEqual, strictEqual} = require("assert")
const MongoDB = require("./../db/strategies/MongoDB")
const ContextStrategy = require("./../db/strategies/common/ContextStrategy")

const context = new ContextStrategy(new MongoDB())

const DEFAULT_HERO = {
    name: "Stan Lee",
    power: "God creator of the universe",
}

describe("MongoDB Strategy", function () {
    
    it('Should Connect', async () => {
        const result = await context._connect()
        const expected = 1;
        strictEqual(result, expected);
    })

    it('Should disconnect', async () => {
        const conn = await context._connect()
        await context._disconnect();
        const result = context.isConnected()
        const expected = false;
        strictEqual(result, expected)

    })


})