require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const { conectarDB } = require('./database/config');

//Crea el servidor express
const app = express();

// Configurar CORS
const whitelist = ['https://parroquiantssalud.onrender.com/api'];

    const corsOptionsCheck = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsCheck));

//Lectura y parseo del body
app.use( express.json() );

// Esta es la base de datos
conectarDB();

//Directorio público
app.use( express.static('public') );


//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/articulos', require('./routes/articulos') );
app.use( '/api/inventarios', require('./routes/inventarios') );
app.use( '/api/reservas', require('./routes/reservas') );
app.use( '/api/eventos', require('./routes/eventos') );
app.use( '/api/busquedas', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/archivos', require('./routes/archivos') );

app.get('*', (req, res) => {
        res.sendFile( path.resolve( __dirname, 'public/index.html') );
});


// app.listen( process.env.PORT, () => {
//     console.log('Servidor corriendo en puerto ' + process.env.PORT );
// });



  