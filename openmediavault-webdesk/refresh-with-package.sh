#!/bin/bash

echo "Suppression des anciens containers..."

docker-compose -f docker-compose-empty.yml stop
docker-compose -f docker-compose-empty.yml rm -f

echo "Démarrage de OMV..."

docker-compose -f docker-compose-empty.yml up -d

echo "Attente du container OMV..."
until nc -z $(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' omv) 80
do
    sleep 0.5
done
echo "OK"

echo "Installation du package .deb"
docker exec -t "omv" bash -c "dpkg -i /var/www/test/openmediavault-webdesk_*_all.deb"

PORT=`docker inspect -f '{{json .NetworkSettings.Ports}}' omv | sed -e 's/.*"80\/tcp[^}]*HostPort":"//g' | sed -e 's/".*//g'`

echo -e "\033[32m"
echo -e "Votre environnement est maintenant disponible, à cette adresse: "
echo -e "http://localhost:$PORT"
