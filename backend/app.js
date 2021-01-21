const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const dbAdmin = require('./key');
const dbKey = dbAdmin.dbKey;
const mongoSanitize = require('express-mongo-sanitize');


const app = express();

mongoose.connect(`mongodb+srv://${dbKey.login}:${dbKey.password}@cluster0.62t3n.mongodb.net/sopeko?retryWrites=true&w=majority`,  
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json({limit: '2Mb'}));

/*to avoid sql injection by replacing prohibited characters ($ et .) with _ 
(callback passed as the first argument to app.use(), it matches all routes ) */
app.use(mongoSanitize({
  replaceWith: '_'
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
