const { Products, Sections } = require("../db");
const { Op } = require("sequelize");

const getAllSections = async (req, res) => {
    try {
        const sections = await Sections.findAll();  // Obtiene todas las secciones.
        return res.status(200).json(sections);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getSectionById = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID de la sección desde los parámetros de la solicitud.
    try {
        const section = await Sections.findByPk(id);  // Busca la sección por su ID.

        if (!section) return res.status(404).json({ message: "Sección no encontrada" });

        return res.status(200).json(section);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const postSection = async (req, res) => {
    const { sectionName, description, images, title } = req.body;  // Obtiene los datos de la nueva sección desde el cuerpo de la solicitud.
    console.log(sectionName, description, images, title);

    try {
        if (!sectionName, !description, !images, !title) throw Error("Faltan datos");

        const newSection = await Sections.create({ sectionName, description, images, title });  // Crea una nueva sección.
        return res.status(201).json({ message: "Sección creada correctamente", sectionName: newSection });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateSection = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID de la sección desde los parámetros de la solicitud.
    const { sectionName, buttonText, images, title, description } = req.body;  // Obtiene los datos actualizados de la sección desde el cuerpo de la solicitud.
    try {
        const [updated] = await Sections.update(
            { sectionName, buttonText, images, title, description },
            { where: { id } }
        );

        if (updated === 0) return res.status(404).json({ message: "Sección no encontrada" });

        return res.status(200).json({ message: "Sección actualizada con éxito" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteSection = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID de la sección desde los parámetros de la solicitud.
    try {
        const deleted = await Sections.destroy({ where: { id } });  // Elimina la sección de la base de datos.

        if (deleted === 0) return res.status(404).json({ message: "Sección no encontrada" });

        return res.status(200).json({ message: "Sección eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const assignProductsToSection = async (req, res) => {
    const { sectionId, productIds } = req.body;  // Obtiene el ID de la sección y los IDs de los productos desde el cuerpo de la solicitud.
    try {
        // Encuentra la sección por su ID
        const section = await Sections.findByPk(sectionId);
        if (!section) throw Error("Sección no encontrada");

        // Encuentra los productos por sus IDs
        const products = await Products.findAll({
            where: {
                id: {
                    [Op.in]: productIds
                }
            }
        });

        if (products.length !== productIds.length) throw Error("Uno o más productos no se encontraron");

        // Asocia los productos con la sección
        await section.setProducts(products);
        return res.status(200).json({ message: "Productos asignados a la sección correctamente" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const removeProductsFromSection = async (req, res) => {
    const { sectionId, productIds } = req.body;  // Obtiene el ID de la sección y los IDs de los productos desde el cuerpo de la solicitud.
    try {
        const section = await Sections.findByPk(sectionId);
        if (!section) throw Error("Sección no encontrada");

        await section.removeProducts(productIds);  // Desasocia los productos de la sección.
        return res.status(200).json({ message: "Productos desasignados de la sección correctamente" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAllSections,
    getSectionById,
    postSection,
    updateSection,
    deleteSection,
    assignProductsToSection,
    removeProductsFromSection
};