const express = require("express");

const router = require("./routes");
//middleware de registro de solicitudes HTTP para Express.
const morgan = require("morgan");

const cors = require("cors");
// Crea una instancia de la aplicación Express y la asigna a la variable "server"
const server = express();
// Configura el middleware "morgan" en modo de desarrollo para registrar las solicitudes entrantes en la consola.
server.use(morgan("dev"));
// Configura el middleware de análisis de cuerpo JSON para procesar los datos JSON de las solicitudes entrantes
server.use(express.json());

server.use(cors());
//Agrega el middleware "router" (que contiene la lógica de enrutamiento) a la aplicación Express.
server.use(router);

module.exports = server;
