/*
    Preciso obter um usuario
    Preciso obter o numero de telefone de um usuario a partir de seu id
    Obter endereco do usuario pelo id
*/
// importamos o modulo interno do NodeJS
const util = require("util");
const getAddressAsync = util.promisify(getAddress);


function getUser(){
    //quando der problema -> reject(ERRO)
    //quando success -> resolve
    return new Promise(function resolvePromise(resolve, reject){

        setTimeout(function(){
            // return reject(new Error("ALALALALA"))
            return resolve({
                id: 1,
                name: "Irineu",
                birthDate: new Date()
            })
        }, 1000)

    });

    
}

function getPhone(idUser){
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            return resolve({
                phone: "5552295",
                ddd: 22
            })
        }, 1500)

    })
    
}

function getAddress(idUser, callback){
    setTimeout(() => {
        return callback(null, {
            street: "Av. Redension",
            number: 325
            })
    }, 1250);
}

const promiseUser = getUser();
//para manipular o success usamos .then
//para manipular errors usamos .catch

promiseUser
    .then((response) => {

        return getPhone(response.id)
            .then((result) => {
                return {
                    user: response,
                    phone: result
                }
            })

    })
    .then((response) => {
        const address = getAddressAsync(response.user.id);
        return address.then((data) => {
            return {
                user: response.user,
                phone: response.phone,
                address: data
            }
        });
    })
    .then(function(response){
        console.log(`
        Nome: ${response.user.name}
        Telefone: (${response.phone.ddd}) ${response.phone.phone}
        Endereço: ${response.address.street}, ${response.address.number}
        `)
    })
    .catch(function(error){
        console.error("deu pal", error);
    })


 