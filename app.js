const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express();

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '.ssl_keys', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, '.ssl_keys', 'server.cert'))
}

// Ajout du logger pour les requêtes
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use('/assets', (req, res, next) => {
  console.log(`Request for static file: ${req.url}`);
  next();
});

// Dossier des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Fonction pour créer des routes dynamiques à partir des fichiers dans le dossier 'pages'
const loadRoutesFromDirectory = (dirPath) => {
    fs.readdirSync(dirPath).forEach(file => {
      const fileNameWithoutExtension = path.parse(file).name;
  
      // Associer la route racine (/) à 'index.html'
      if (fileNameWithoutExtension === 'index') {
        app.get('/', (req, res) => {
          res.sendFile(path.join(dirPath, file));
        });
      }
  
      // Créer une route pour chaque fichier HTML sauf pour 'index.html'
      else {
        app.get(`/${fileNameWithoutExtension}`, (req, res) => {
          res.sendFile(path.join(dirPath, file));
      });
    }
  });
};
  

// Appeler la fonction pour charger les routes depuis le dossier 'pages'
loadRoutesFromDirectory(path.join(__dirname, 'pages'));

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'css', 'style.css'));
});


// Gestion des erreurs 404
// app.use((req, res) => {
//   res.status(404).redirect('/404')
// });
// Démarrer le serveur
https.createServer(sslOptions, app).listen(3000, () => {
    console.log("HTTPS Server running on https://localhost:3000")
});

console.log('Serving static files from:', path.join(__dirname, 'assets'));