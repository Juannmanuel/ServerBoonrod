const { Router } = require("express");
const { getAllSections, getSectionById, postSection, updateSection, deleteSection, assignProductsToSection, removeProductsFromSection } = require("../Controllers/controllersSections"); // Asegúrate de que la ruta sea correcta
const routerSections = Router();

// Configura una ruta para obtener todas las secciones.
routerSections.get("/", getAllSections); // Usa el controlador getAllSections

// Configura una ruta para obtener una sección por su ID.
routerSections.get("/:id", getSectionById); // Usa el controlador getSectionById

// Configura una ruta para crear una nueva sección.
routerSections.post("/", postSection); // Usa el controlador postSection

// Configura una ruta para actualizar una sección por su ID.
routerSections.put("/:id", updateSection); // Usa el controlador updateSection

// Configura una ruta para eliminar una sección por su ID.
routerSections.delete("/:id", deleteSection); // Usa el controlador deleteSection

// Configura una ruta para asignar productos a una sección.
routerSections.post("/assign-products", assignProductsToSection); // Usa el controlador assignProductsToSection

// Configura una ruta para remover productos de una sección.
routerSections.delete("/remove-products", removeProductsFromSection); // Usa el controlador removeProductsFromSection

module.exports = routerSections;
