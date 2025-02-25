const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the dist directory (la carpeta generada por Angular)
app.use(express.static(path.join(__dirname, 'dist/gestionaplicacionescpd')));

// Redirige todas las solicitudes al archivo index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/gestionaplicacionescpd/index.html'));
});

// Inicia el servidor en el puerto 8080 o el puerto que se pase en la variable de entorno
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
