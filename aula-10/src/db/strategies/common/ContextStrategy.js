class ContextStrategy{
    constructor(strategy){
        this._database = strategy
    }

    async create(item){
        await this._connect()
        return this._database.create(item)
    }

    async read(query){
        await this._connect()        
        return this._database.read(query)
    }

    async update(id, item){
        await this._connect()
        return this._database.update(id, item)
    }

    async delete(id){
        await this._connect()
        return this._database.delete(id)
    }

    _connect(){
        return this._database.connect()
    }

    isConnected(){
        return this._database.isConnected()
    }

}


module.exports = ContextStrategy