/*
    Preciso obter um usuario
    Preciso obter o numero de telefone de um usuario a partir de seu id
    Obter endereco do usuario pelo id
*/

function getUser(callback){
    setTimeout(function(){
        return callback(null, {
            id: 1,
            name: "Irineu",
            birthDate: new Date()
        })
    }, 1000)
}

function getPhone(idUser, callback){
    setTimeout(() => {
        return callback(null, {
            phone: "5552295",
            ddd: 22
        })
    }, 1500)
}

function getAddress(idUser, callback){
    setTimeout(() => {
        return callback(null, {
            address: "Av. Redension",
            number: 325
            })
    }, 1250);
}

getUser(function resolveUser( error, user){
    //null || "" || 0 === false

    if(error){
        console.error("Error no user parsero", error);
        return;
    }

    getPhone(user.id, function resolvePhone(error1, phone){
        if(error1){
            console.error("Error no telefone parsero", error1);
            return;
        }

        getAddress(user.id, function resolveAddress(error2, address){
            if(error2){
                console.error("Error no address parsero", error2);
                return;
            }
            else{
                console.log(`
                Nome: ${user.name},
                Endereco: ${address.address}, ${address.number}
                Data de nascimento: ${user.birthDate}
                Telefone: (${phone.ddd}) ${phone.phone}
                `);
            }
        })

        
    })

    
})
