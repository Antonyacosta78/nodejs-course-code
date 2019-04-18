const axios = require('axios')
const swapiUrl = `https://swapi.co/api/people`

async function getPeople(name){
    const url = `${swapiUrl}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    getPeople
}