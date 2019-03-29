sudo docker ps

//postgres start


sudo docker run --name postgres -e POSTGRES_USER=antony -e POSTGRES_PASSWORD=mysecretpass -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

//postgre adminer start

sudo docker run --name adminer -p 8010:8010 --link postgres:postgres -d adminer