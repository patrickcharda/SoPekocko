## SoPekocko

Projet de développement du back-end d'un mini-site dans le cadre de la formation de développeur web dispensée par OpenClassrooms.

Le front-end fourni par OpenClassrooms se trouve ici : https://github.com/OpenClassrooms-Student-Center/dwj-projet6

## Installation dans un dossier projet

- Cloner le dépôt du frontend (développé avec Angular) dans un dossier frontend.
- Cloner le dépôt du backend dans un dossier backend.
- Installer les dépendances (dans le dossier racine du backend) :

  - bcrypt
  - body-parser
  - crypto-js
  - express
  - express-mongo-sanitize
  - jsonwebtoken
  - mongoose
  - mongoose-unique-validator
  - multer
  - password-validator
  
- A la racine du dossier backend, créer un fichier key.js avec le contenu suivant :

  const dbKey = { 
    login: 'your-mongo-database-admin-login',
    password: 'your-password'
  };
  
  exports.dbKey = dbKey;
  
- Dans le fichier app.js, repérer la ligne suivante :

  mongoose.connect(`mongodb+srv://${dbKey.login}:${dbKey.password}@cluster0.62t3n.mongodb.net/sopeko?retryWrites=true&w=majority`,  

  Y remplacer cluster0.62t3n.mongodb.net/sopeko? par votreCluster.mongodb.net/votreBaseDeDonnees?
  
## Démarrer en local

- avec le terminal, ng serve depuis le dossier frontend
- avec le terminal, node server depuis le dossier backend

Le site est accessible à http://localhost:4200/





  
  





