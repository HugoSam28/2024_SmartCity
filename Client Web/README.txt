    INSTALLATION

DOCKER : 

Ce projet a été fait via une base de données PostgreSQL
Pour ce faire, nous vous conseillons d'utiliser Docker pour créer un conteneur propre à la base de données du projet SmartCity

Voici la commande a lancer dans le terminal Docker pour créer le conteneur : 

    docker run --name SmartCity -e POSTGRES_PASSWORD=Password1 -e POSTGRES_USER=tdhh -e POSTGRES_DB=projet_smart_city -p 5432:5432 -d postgres

avec :

    - SmartCity : nom du conteneur dans Docker
    - tdhh : nom d'utilisateur
    - Password1 : mot de passe de l'utilisateur
    - projet_smart_city : nom de la base de données créée
    - 5432:5432 : port de votre ordinateur lié au port de la machine du conteneur


INITIALISTION DE LA DATABASE

Vous devez initialiser la database en tapant la commande npm run initDB dans votre terminal, depuis le dossier de l'API comprenant le fichier server.js


DEPLOIEMENT DE L'API

Pour déployer l'API, vous devez taper la commande npm start express dans votre terminal, depuis le dossier de l'API comprenant le fichier server.js


DEPLOIEMENT DU BACK OFFICE

Pour déployer le back office, vous devez taper la commande npm run dev dans votre terminal, depuis le dossier du back office comprenant le fichier index.html
Suite à cela, un lien sera accessible dans votre terminal : celui-ci sera votre lien d'acces à votre back office.