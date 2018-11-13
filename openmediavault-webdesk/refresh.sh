#!/bin/bash

docker-compose stop
docker-compose rm -f
docker-compose up -d

docker exec -t "omv" bash -c "/bin/sh postinst configure"


echo "Attente du container OMV..."
until nc -z $(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' omv) 80
do
    sleep 0.5
done
echo "OK"

PORT=`docker inspect -f '{{json .NetworkSettings.Ports}}' omv | sed -e 's/.*"80\/tcp[^}]*HostPort":"//g' | sed -e 's/".*//g'`

echo -e "\033[32m"
echo -e "Votre environnement est maintenant disponible, à cette adresse: "
echo -e "http://localhost:$PORT"
