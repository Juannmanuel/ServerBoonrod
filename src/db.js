require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
});

// Prueba de conexión
sequelize.authenticate()
  .then(() => {
    console.log('La conexión a la base de datos fue exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Sections, Products } = sequelize.models;

//Se definen relaciones de muchos a muchos entre los modelos Sections y Products utilizando el método belongsToMany, especificando la tabla intermedia 'SectionsProducts' y desactivando los timestamps
Sections.belongsToMany(Products, { through: 'SectionsProducts', timestamps: false });
Products.belongsToMany(Sections, { through: 'SectionsProducts', timestamps: false });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
