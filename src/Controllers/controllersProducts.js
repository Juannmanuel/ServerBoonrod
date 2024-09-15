const { Products, Sections } = require("../db");
const { Op } = require("sequelize");

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.findAll();  // Obtiene todos los productos.
        return res.status(200).json(allProducts);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getProductsBySection = async (req, res) => {
    const { sectionName } = req.params; // La sección se pasa como parámetro de la URL.

    try {
        const section = await Sections.findOne({
            where: { name: sectionName },
            include: Products,  // Incluye los productos relacionados con esa sección.
        });

        if (!section) {
            return res.status(404).json({ message: "Sección no encontrada" });
        }

        return res.status(200).json(section.Products);  // Devuelve solo los productos de la sección.
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const postProduct = async (req, res) => {
    const { name, type, price, sizes, inStock, discount, categories, images, description, sectionId } = req.body;
    try {
        // Verifica si los datos obligatorios están presentes
        if (!name || !type || !price || !sizes || inStock === undefined || !images) {
            throw Error("Faltan datos obligatorios");
        }

        // Crea el producto en la base de datos
        const newProduct = await Products.create({
            name,
            type,
            price,
            sizes,
            inStock,
            discount: discount || null,  // Opcional, se usa null si no se pasa un descuento
            categories: categories || [],  // Opcional
            images,
            description
        });

        // Si se proporciona una sección, asocia el producto con la sección
        if (sectionId) {
            const section = await Sections.findByPk(sectionId);
            if (!section) throw Error("Sección no encontrada");
            await newProduct.setSection(section);
        }

        return res.status(201).json({ message: "Producto creado correctamente", product: newProduct });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID del producto desde los parámetros de la solicitud.
    const { name, type, price, sizes, inStock, discount, categories, images, description, sectionId } = req.body;  // Obtiene los datos actualizados del producto desde el cuerpo de la solicitud.

    try {
        // Actualiza el producto en la base de datos con los nuevos datos proporcionados.
        const [updated] = await Products.update(
            { name, type, price, sizes, inStock, discount, categories, images, description },
            { where: { id } }
        );

        if (updated === 0) return res.status(404).json({ msg: "Producto no encontrado" });

        // Si se proporciona una sección, actualiza la asociación con la sección
        if (sectionId) {
            const section = await Sections.findByPk(sectionId);
            if (!section) throw Error("Sección no encontrada");
            const product = await Products.findByPk(id);
            await product.setSection(section);
        }

        return res.status(200).json({ msg: "Producto actualizado con éxito!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID del producto desde los parámetros de la solicitud.
    try {
        const deleted = await Products.destroy({ where: { id } });  // Elimina el producto de la base de datos.

        if (deleted === 0) return res.status(404).json({ message: "Producto no encontrado" });

        return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;  // Obtiene el ID del producto desde los parámetros de la solicitud.
    try {
        const product = await Products.findByPk(id, { include: Sections });  // Busca el producto por su ID e incluye la sección relacionada.

        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const searchProducts = async (req, res) => {
    const { query } = req.query;  // Obtiene el término de búsqueda desde los parámetros de la solicitud.
    try {
        const products = await Products.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },  // Busca productos cuyo nombre contenga el término de búsqueda (ignorando mayúsculas/minúsculas).
                    { description: { [Op.iLike]: `%${query}%` } }  // Busca productos cuyo descripción contenga el término de búsqueda.
                ]
            }
        });

        if (!products.length) throw Error("No se encontraron productos que coincidan con la búsqueda");

        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsBySection,
    postProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}