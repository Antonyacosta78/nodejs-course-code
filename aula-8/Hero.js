class Hero{
    constructor({name, power, id}){
        if(typeof name === "string") this.name = name;
        if(power) this.power = power;
        if(id) this.id = id;
    }
}

module.exports = Hero;