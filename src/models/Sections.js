const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  sequelize.define('Sections', {
    id: {
      type: DataTypes.UUID, // Usamos UUID para asegurar unicidad
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Aseguramos que la sección no se repita
    },
    buttonText: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Explorar" // Valor estático si no se proporciona
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: false // Primera imagen, obligatoria
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: false // Segunda imagen, obligatoria
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: false // Tercera imagen, obligatoria
    },
    image4: {
      type: DataTypes.STRING,
      allowNull: false // Cuarta imagen, obligatoria
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false // Título de la colección, obligatorio
    },
    description: {
      type: DataTypes.TEXT, // Descripción más larga
      allowNull: true // Descripción opcional
    }
  }, { timestamps: false });
};
