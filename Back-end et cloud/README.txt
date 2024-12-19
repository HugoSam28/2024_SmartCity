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

Vous devez initialiser la database en tapant la commande npm run initDB dans votre terminal, depuis votre dossier comprenant le fichier server.js

Cette initialisation/réinitialisation de la DataBase doit être effectuée dans 2 cas de figure :

    - Avant le déploiement de l'API
    - Avant le lancement des tests postman (sachez que ceux-ci vont modifier vos données dans la DataBase : il est donc judicieux de les lancer en tout premier)


DEPLOIEMENT DE L'API

Pour déployer l'API, vous devez taper la commande npm start express dans votre terminal, depuis votre dossier comprenant le fichier server.js


LANCEMENT DES TESTS POSTMAN

Depuis le dossier où se trouve le fichier server.js, vous trouverez le fichier ./postman/v1/TestsPostman.json
Vous pouvez importer celui-ci dans Postman puis appuyer sur RUN (en ayant préalablement déployé votre API en local et réinitialisé votre DataBase)
Les tests DOIVENT, si vous avez bien réinitialisé la DataBase au préalable et déployé l'API en local, être tous réussis


SWAGGER

Depuis le dossier où se trouve le fichier server.js, vous trouverez le fichier ./swagger/v1/spec.json
Ce fichier doit être importé dans un SwaggerViewer pour pouvoir découvrir la documentation Swagger de l'API