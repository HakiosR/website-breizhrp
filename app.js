const express = require('express');
const http = require('http');  // Utilise http au lieu de https
const path = require('path');
const fs = require('fs');
const app = express();

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

// Démarrer le serveur HTTP
http.createServer(app).listen(3000, () => {
    console.log("HTTP Server running on http://localhost:3000");
});

console.log('Serving static files from:', path.join(__dirname, 'assets'));
