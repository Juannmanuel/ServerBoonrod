// Importa la clase DataTypes de la librería Sequelize, que se utiliza para definir tipos de datos de columna en un modelo.
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//Exporta una función que define el modelo Section y recibe como argumento la instancia sequelize de la conexión a la base de datos
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Section', {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,// Establece un valor por defecto generado automáticamente como un UUID v4
            allowNull: false

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isInt: true, //Verifica que los valores sean enteros.
              }
        },
        season: {
            type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
            allowNull: false
        }

    }, { timestamps: false });
};