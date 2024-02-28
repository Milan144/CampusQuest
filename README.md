# Campus Quest (FR)

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
