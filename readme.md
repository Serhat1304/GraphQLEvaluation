# Projet : Evaluation Finale Graph QL

## Description du projet

Le but de cet exercice est de créer un réseau social où les utilisateurs peuvent :

- S'inscrire
- Publier des articles
- Commenter les publications d'autres utilisateurs
- "Liker" des articles

Ce projet mettra en pratique l'utilisation des queries, mutations, et l'intégration avec Prisma pour la gestion de la base de données tout en implémentant la partie Frontend de notre produit.


## Installation

### Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)

### Backend

1. Naviguez dans le répertoire `eval-finale-backend` :

    ```bash
    cd eval-finale-backend
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Configurez la base de données avec Prisma :

    ```bash
    npx prisma migrate deploy
    ```

4. Démarrez le serveur backend :

    ```bash
    npm run dev
    ```

### Frontend

1. Naviguez dans le répertoire `front` :

    ```bash
    cd front
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Démarrez le serveur frontend :

    ```bash
    npm start
    ```
