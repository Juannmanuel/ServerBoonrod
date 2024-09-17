const { Router } = require("express");
const { getAllProducts, getProductById, getProductsBySection, postProduct, updateProduct, deleteProduct, searchProducts } = require("../Controllers/controllersProducts"); // Asegúrate de que la ruta sea correcta
const routerProducts = Router();

// Configura una ruta para obtener todos los productos.
routerProducts.get("/", getAllProducts); // Usa el controlador getAllProducts

// Configura una ruta para crear un nuevo producto.
routerProducts.post("/", postProduct); // Usa el controlador postProduct

// Configura una ruta para eliminar un producto por su ID.
routerProducts.delete("/:id", deleteProduct); // Usa el controlador deleteProduct

// Configura una ruta para actualizar un producto por su ID.
routerProducts.put("/:id", updateProduct); // Usa el controlador updateProduct

// Configura una ruta para obtener un producto por su ID.
routerProducts.get("/:id", getProductById); // Usa el controlador getProductById

// Configura una ruta para obtener todos los productos de una sección específica.
routerProducts.get("/section/:sectionId", getProductsBySection); // Usa el controlador getProductsBySection

// Configura una ruta para buscar productos.
routerProducts.post("/search", searchProducts);

// routerProducts.get('/search/:text', (req, res) => {
//     console.log(req.query); // Imprime todo el cuerpo de la solicitud
//     res.send('Cuerpo recibido')
// });

module.exports = routerProducts;
