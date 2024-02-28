# Campus Quest
This is a school project for MyDigitalSchool (MBA 1)

*This documentation is available in french and english*
1. [FR](#FR)
2. [EN](#EN)

# FR

## Documentation utilisateur

### Liens pour se connecter à l'application : 

- Version de test sans vérification de la localisation [ICI](https://cqtest.hommet.ch)
- Version avec vérification de la localisation (ne marche que a MDS) [ICI](https://cq.hommet.ch)

### Connexion

Quand on arrive sur l'application / site pour la première fois, une page de connexion apparait : on peut se connecter ou créer un compte via email et mot de passe ou via un compte GitHub.

### L'application se compose de trois pages :

- Page principale avec les quêtes et le scanner de quêtes
- Page de partage où l'on peut voir les posts et poster un nouveau post
- Page d'assistance où l'on peut envoyer une  demande d'aide

### Installation en PWA

Pour installer en PWA, sur mobile, cliquer sur le bouton de partage du navigateur (safari sur iPhone) puis sur *Ajouter a l'écran d'accueil*.

### Validation d'une quête

- Cliquer sur le bouton *SCAN A QR CODE*
- Scanner le QR code correspondant a une quête
- Cliquer sur le bouton *Close*
- La quête passe au statut *Complete*

### Poster un nouveau post

Cliquer sur le bouton *Share* : on accède à la liste des posts et on peut faire un nouveau post en remplissant le formulaire.

### Poster une demande d'aide

Cliquer sur le bouton *Help* : on accède à la liste des demandes d'aides déjà existantes et on peut faire une nouvelle demande en remplissant le formulaire.

### Utilisation hors ligne (Non fonctionnelle)

L'utilisation hors ligne n'est pas fonctionnelle pour le moment, car le data-service-worker ne fonctionne pas, mais le code est disponible.

Il devrait intercepter la requête API et sauvegarder les données dans le cache local.

## Documentation technique

### Technologies utilisées

Projet :
- NextJS 14
- Typescript
- Bun

BDD : 
- MongoDB avec MongoDBAtlas

Style : 
- TailwindCss
- tw-elements
- react-toastify

Authentification:
- Clerk

PWA: 
- next-pwa
- react-geolocated
- modern-react-qr-reader
  
### Api

L'api est composée de trois routes principales : 

- /quests
- /share
- /help

Chaque route dispose d'une méthode GET pour récupérer la liste des éléments depuis la base de données et d'une méthode POST pour envoyer un nouvel élément en bdd ou mettre à jour un élément.

#### /quests

Params du GET : 
- userId (id de l'user actuellement connecte)

Params du POST :
- code (code du qr code pour identifier la quête)
- id (id de l'user actuellement connecte)

#### /share

Params du POST :

Objet dans le body (req.JSON()) composée de :

- title (titre du post)
- description (description du post)
- user (nom de l'utilisateur)

#### /help

Params du POST

Objet dans le body (req.JSON()) composée de :

- title (titre de la demande d'aide)
- description (description de la demande d'aide)
- user (nom de l'utilisateur)

### Déploiement 

- Faire une application Clerk et mettre un token api GitHub en suivant la doc Clerk [https://dashboard.clerk.com/ ](https://clerk.com/docs)
- Créer une DB MongodbAtlas appellee campusquest et récupérer l'uri de connexion [[https://dashboard.clerk.com/](https://cloud.mongodb.com/)
- bun install | npm install
- Compléter les variables d'environnement du .env.local et les mettre dans un .env
- bun run dev | npm run dev


# EN

## User Documentation

### Links to Access the Application:

- Test version without location verification [HERE](https://cqtest.hommet.ch)
- Version with location verification (only works at MDS) [HERE](https://cq.hommet.ch)

### Login

When accessing the application / site for the first time, a login page appears: you can either log in or create an account via email and password or through a GitHub account.

### The Application Consists of Three Pages:

- Main page with quests and quest scanner
- Sharing page where you can view posts and create a new post
- Assistance page where you can send a help request

### PWA Installation

To install as a PWA, on mobile, click on the browser's share button (Safari on iPhone) then on *Add to Home Screen*.

### Validating a Quest

- Click on the *SCAN A QR CODE* button
- Scan the QR code corresponding to a quest
- Click on the *Close* button
- The quest status changes to *Complete*

### Posting a New Post

Click on the *Share* button: you'll access the list of posts and can create a new post by filling out the form.

### Posting a Help Request

Click on the *Help* button: you'll access the list of existing help requests and can make a new request by filling out the form.


### Offline Usage (Non-functional)

Offline usage is currently not functional as the data-service-worker is not working, but the code is available.

It should intercept the API request and save the data in the local cache.

## Technical Documentation

### Technologies Used

Project:
- NextJS 14
- TypeScript
- Bun

Database:
- MongoDB with MongoDBAtlas

Styling:
- TailwindCSS
- tw-elements
- react-toastify

Authentication:
- Clerk

PWA:
- next-pwa
- react-geolocated
- modern-react-qr-reader
  
### API

The API consists of three main routes:

- /quests
- /share
- /help

Each route has a GET method to retrieve the list of items from the database and a POST method to send a new item to the database or update an existing one.

#### /quests

GET Params:
- userId (id of the currently logged-in user)

POST Params:
- code (QR code code to identify the quest)
- id (id of the currently logged-in user)

#### /share

POST Params:

Object in the body (req.JSON()) composed of:

- title (title of the post)
- description (post description)
- user (user's name)

#### /help

POST Params

Object in the body (req.JSON()) composed of:

- title (title of the help request)
- description (help request description)
- user (user's name)

### Deployment

- Develop an application with Clerk and set up a GitHub API token following the Clerk documentation [https://dashboard.clerk.com/](https://clerk.com/docs).
- Create a MongoDB Atlas database called "campusquest" and retrieve the connection URI from [https://dashboard.clerk.com/](https://cloud.mongodb.com/).
- Run `bundle install` or `npm install`.
- Complete the environment variables in the `.env.local` file and transfer them to a `.env` file.
- Run `bundle run dev` or `npm run dev`.
