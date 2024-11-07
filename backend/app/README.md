# Projet Backend - Association ANNA

Ce backend est conçu pour gérer les utilisateurs et les informations des pays détenu dans la base de données d'une association. Il permet la connexion via un JSON Web Token, la gestion des rôles utilisateurs, les droits d'accès ainsi qu'une recherche et mise à jour des pays.

## Fonctionnalités

- **Authentification** : Authentification sécurisée via JSON Web Token
- **Gestion des utilisateurs**: Gestion des rôles utilisateurs
- **Accès aux informations des pays**: Recherche dynamique + 3 pages avec des quantités d'infos différentes

## Prérequis

- **node.js et npm**
- **Dépendances**: Toutes les dépendances sont dans le fichier "package.json" à la racine de la partie backend

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_DEPOT>

2. Installation des dépendances :
    ```bash
    npm install

3. Configurer les variables d'environnement :
    ```env
    PORT=3001
    JWT_SECRET=phrasesecret
    JWT_TIME=1h
    URL_ORIGIN=http://localhost:3000

4. Démarrer le serveur :
    ```bash
    nodemon app.js
    ```

    Si nodemon n'est pas installé
    ```bash
    npm install -g nodemon

## Réalisation des tests

1. Lancement des tests unitaires et fonctionnels
    ```bash
    npm test

## Informations complémentaires

Le mot de passe des utilisateurs pré-inscrits est : password