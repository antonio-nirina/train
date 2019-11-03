# Copier des fichiers à partir de l'hôte Docker
# COPY MyFiles /usr/share/nginx/html : le contenu html est dans le repetoire MyFiles
# Run un nouveau conteneur sera créé et une commande sera exécutée dans ce conteneur
# Docker run --rm : Remove un container
# # Tells the Docker which base image to start.


#FROM node

# Adds files from the host file system into the Docker container.
#Copie tous les fichiers de notre référentiel local
#ADD . /app

# Sets the current working directory for subsequent instructions
# définit le répertoire de travail actuel pour les instructions suivantes
#WORKDIR /app

#RUN npm install
#RUN npm install -g bower
#RUN bower install --allow-root
#RUN npm install -g nodemon

#expose a port to allow external access
#EXPOSE 3000

# Start mean application
#CMD ["nodemon", "server.js"]

#exécute toutes les commandes d'un nouveau calque au-dessus de l'image en cours, puis valide les résultats. 
#L'image résultante sera ensuite utilisée dans les prochaines étapes.

#EXPOSE ouvrira un port sur notre conteneur, mais pas l'hôte.

#CMD est ce qui se passera lorsque nous exécuterons notre conteneur en utilisant docker depuis la ligne de commande.
#Il faut des arguments comme un tableau.

##Docker-Compose.yml

#mean:
#  build: .
#  links:
#    - db
#  ports:
#    - "80:3000"
#db:
#  image: mongo
#  ports:
#    - "27017:27017"
# La ligne mean définit un service. 
#La commande build indique à docker-compos que nous voulons que le service soit généré en exécutant docker build 
#dans le chemin indiqué (".").

# docker-compos up
#Construit, (re) crée, démarre et attache à des conteneurs pour un service.
#Les services liés seront démarrés, à moins qu'ils ne soient déjà en cours d'exécution.
#Par défaut, docker-compos up agrégera la sortie de chaque conteneur et, lorsqu'il sortira, 
#tous les conteneurs seront arrêtés. L'exécution de docker-compos up -d lancera 
#les conteneurs en arrière-plan et les laissera en cours d'exécution.
#Par défaut, s'il y a des conteneurs existants pour un service, docker-composer up 
#s'arrête et les recrée (en conservant les volumes montés avec des volumes à partir de ),
#de sorte que les modifications apportées à docker-compose.yml soient prises en compte. 
#Si vous ne voulez pas que les conteneurs soient arrêtés et recréés,
#utilisez docker-compos up - no-recreate . Cela lancera tout conteneur arrêté, si nécessaire.

# docker-compose build
# docker-compose up -d
# Volume: monter directement un fichier de configuration dans un conteneur en cours d’exécution à l’aide de volumes
# en remplaçant une directive `build` par` image` et `volumes`

# Element docker-compose:
# version: "3.7"
# services:
# 	frontend:
#    	image: my-vue-app     
#       image: ubuntu:latest image récuperer sur DockerHUB
#       build: /path/to/dockerfile/    construire une une image à partir du code source en lisant son fichier Docker 
#       ports:
#         - "8081:8080"  conteneurs sera disponible sur les ports 8080 et 8081 de l'hôte
#  	backend:
#    	image: my-springboot-app
#  	db:
#    	image: "postgres:${POSTGRES_VERSION}"
#  		environment:
#       DB: mydb
#       USER: "${USER}"  on configure dans .env les variables
# volumes: un volume est un répertoire partagé de l'hôte , visible depuis tout ou partie des conteneurs.
# networks: définissent les règles de communication entre les conteneurs et entre un conteneur et l'hôte
# expose : Un service peut communiquer avec un autre service du même réseau en le référençant simplement par nom de conteneur et par port