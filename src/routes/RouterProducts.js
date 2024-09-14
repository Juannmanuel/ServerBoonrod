const { Router } = require("express")
// const { getAllActivities, postActivity, deleteActivity, updateActivity, getActivityById } = require("../Controllers/controllersActivities")
const routerProducts = Router()

// Configura una ruta para obtener todas las actividades.
routerProducts.get("/", (req, res) => {
    res.send("Ruta get")
});

// Configura una ruta para crear una nueva actividad.
routerProducts.post("/", (req, res) => {
    res.send("Ruta get")
});

// Configura una ruta para eliminar una actividad por su ID.
routerProducts.delete("/:id", (req, res) => {
    res.send("Ruta get")
});

// Configura una ruta para actualizar una actividad por su ID.
routerProducts.put("/:id", (req, res) => {
    res.send("Ruta get")
});

// Configura una ruta para obtener una actividad por su ID.
routerProducts.get("/:id", (req, res) => {
    res.send("Ruta get")
});

module.exports = routerProducts;
