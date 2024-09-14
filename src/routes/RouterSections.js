const { Router } = require("express")
// const { getAllCountries, getCountryById, getCountryByName }  = require("../Controllers/controllersCountries");
const routerSections = Router()
// Configura una ruta para obtener todos los países.
routerSections.get("/", (req, res) => {
    res.send("Ruta get")
})
// Configura una ruta para obtener un país por su nombre.
routerSections.get("/name", (req, res) => {
    res.send("Ruta get")
})
// Configura una ruta para obtener un país por su ID.
routerSections.get("/:idPais", (req, res) => {
    res.send("Ruta get")
})


module.exports = routerSections;