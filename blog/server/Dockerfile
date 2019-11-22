# Il s'agit d'une image officielle , construite par les fournisseurs de node.js et validée par Docker
# WORKDIRcette option pour spécifier que toutes les actions suivantes doivent être effectuées à partir du répertoire 
# /usr/src/app de votre système de fichiers image (jamais du système de fichiers de l'hôte)
# COPY le fichier package.jsonde votre hôte à l'emplacement actuel ( .) dans votre image (donc dans ce cas, à /usr/src/app/package.json) 
# RUNla commande à l' npm installintérieur de votre système de fichiers image 
# (qui lira package.jsonpour déterminer les dépendances de nœud de votre application et les installer)
# COPY dans le reste du code source de votre application depuis votre hôte vers votre système de fichiers image
# comment exécuter un conteneur à partir de cette image

FROM node:6.11.5 

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]