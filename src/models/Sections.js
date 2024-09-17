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
    sectionName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Aseguramos que la sección no se repita
    },
    buttonText: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Explorar" // Valor estático si no se proporciona
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        // Validación personalizada para el tamaño exacto del array
        validArraySize(value) {
          if (value.length !== 4) {
            throw new Error('El array debe tener exactamente 4 elementos');
          }
        }
      }
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
