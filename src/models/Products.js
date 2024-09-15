const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // Defino el modelo
    sequelize.define('Products', { 
        id: {
            type: DataTypes.UUID, // UUID para asegurar unicidad
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // Valor UUID v4 generado automáticamente
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false // Nombre del producto, obligatorio
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false // Tipo de producto, ej. "Accesorios"
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Precio con dos decimales
            allowNull: false
        },
        sizes: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Almacenamos las tallas en un array
            allowNull: false
        },
        inStock: {
            type: DataTypes.BOOLEAN, // Indica si está en stock
            allowNull: false,
            defaultValue: true // Valor predeterminado si no se especifica
        },
        discount: {
            type: DataTypes.JSON, // Estructura JSON para el descuento
            allowNull: true // No siempre habrá descuento
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Array de categorías, ej. "Hot Sale"
            allowNull: false
        },
        images: {
            type: DataTypes.JSON, // Almacenamos las imágenes como un JSON estructurado
            allowNull: false
        },
        isSoldOut: {
            type: DataTypes.BOOLEAN, // Indica si está agotado
            allowNull: false,
            defaultValue: false // Por defecto, no está agotado
        },
        description: {
            type: DataTypes.TEXT, // Descripción del producto
            allowNull: true
        }
    }, { timestamps: false });
};
