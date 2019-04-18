const { get } = require("axios")

const swapiURL = "https://swapi.co/api/people"

async function getPeople(name){
    const url = `${swapiURL}/?search=${name}&format=json`
    const response = await get(url)
    return response.data.results.map(e => {
        return {name:e.name, height: e.height}
    })
}

module.exports = {
    getPeople
}