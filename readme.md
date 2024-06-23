# Projet : Evaluation Finale Graph QL

## Avant toute chose :

-   Nous n'avons pas coché toutes les cases mais une grande partie de ce qui était demandé.

Il y a juste un beug je ne le comprend pas : Quand on fait un post, un like ou un changement,
j'invalide les query pour les re get afin de mettre tout de suite le site à jour et ne pas à avoir
à faire un refresh de la page pour get la nouvelle data. Sauf que mes invalidates queries ne fonctionne pas
pourtant j'utilse le même procéder dans pleins d'applications différentes mais la c'est la première fois que ca ne fonctionne pas
donc un peu deg d'avoir ce beug, si vos avez une idée de pourquoi ca ne fonctionne pas je suis preneur.

## Description du projet

Le but de cet exercice est de créer un réseau social où les utilisateurs peuvent :

-   S'inscrire
-   Publier des articles
-   Commenter les publications d'autres utilisateurs
-   "Liker" des articles

Ce projet mettra en pratique l'utilisation des queries, mutations, et l'intégration avec Prisma pour la gestion de la base de données tout en implémentant la partie Frontend de notre produit.

## Installation

### Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

-   [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
-   [npm](https://www.npmjs.com/)
-   [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)

### Backend

1. Naviguez dans le répertoire `eval-finale-backend` :

    ```bash
    cd eval-finale-backend
    ```

2. Installez les dépendances :

    ```bash
    yarn install
    ```

3. Configurez la base de données avec Prisma :

    ```bash
    npx prisma migrate deploy
    ```

4. Démarrez le serveur backend :

    ```bash
    yarn start
    ```

### Frontend

1. Naviguez dans le répertoire `front` :

    ```bash
    cd front
    ```

2. Installez les dépendances :

    ```bash
    yarn install
    ```

3. Démarrez le serveur frontend :

    ```bash
    yarn dev
    ```
