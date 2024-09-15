const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');

// const PORT = 3001; 
const PORT =  4000;

// Sincroniza la base de datos y luego inicia el servidor en el puerto especificado.
conn.sync({ force: false }).then(() => {
    server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    });
}).catch(error => console.error(error)); 
