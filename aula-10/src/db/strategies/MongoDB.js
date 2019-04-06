const ICrud = require("./common/interfaceCrud")

class MongoDB extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log(`Item saved on MongoDB Database`);
    }
}

module.exports = MongoDB