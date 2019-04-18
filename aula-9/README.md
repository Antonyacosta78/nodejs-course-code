sudo docker ps

//postgres start

sudo docker run --name postgres -e POSTGRES_USER=antony -e POSTGRES_PASSWORD=mysecretpass -e POSTGRES_DB=heroes --publish --network postgresnet 5432:5432 -d postgres

//adminer start

sudo docker run --name adminer -p 200:8080 --network postgresnet -d adminer

//mongodb start

sudo docker run --name mongodb --publish 201:27017 --network mongonet -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=mysecretpass -d mongo:4

//mongoclient start

sudo docker run --name mongoclient --publish 202:3000 -d --network mongonet mongoclient/mongoclient

sudo docker exec -it mongodb mongo --host localhost -u root -p mysecretpass --authenticationDatabase admin --eval "db.getSiblingDB('heroes').createUser({user:'antony', pwd: 'mysecretpass', roles: [{role:'readWrite', db:'heroes'}] })"