const { Router } = require("express");  // Importa el módulo 'Router' de Express para manejar las rutas.
const routerProducts = require("./RouterProducts");  // Importa el enrutador para las rutas de actividades.
const routerSections = require("./RouterSections");  // Importa el enrutador para las rutas de países.
const router = Router();  // Crea una instancia de Router para las rutas principales.

// Usa el enrutador de países en la ruta "/countries".
router.use("/countries", routerSections);

// Usa el enrutador de actividades en la ruta "/Products".
router.use("/Products", routerProducts);

module.exports = router;  

