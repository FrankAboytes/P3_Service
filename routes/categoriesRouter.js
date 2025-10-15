const express = require('express');
const CategoriesService = require('../services/categoriesServices');

//  CAMBIO CLAVE 1: Se importa el *servicio* de productos, no el router.
// La instancia del servicio se exportó desde 'productsRouter.js' para poderla usar aquí.
const { service: productsService } = require('./productsRouter'); 
const router = express.Router();

//  CAMBIO CLAVE 2: Se crea una única instancia del servicio de categorías.
// Esta instancia manejará toda la lógica y los datos.
const service = new CategoriesService();

// --- ENDPOINTS SIMPLIFICADOS ---

// La ruta solo se encarga de recibir la petición y llamar al servicio.
router.get('/', (req, res) => {
    const categories = service.getAll();
    res.status(200).json(categories);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = service.getById(id);
    if(category) {
        res.status(200).json(category);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json({
        message: 'created',
        data: newCategory
    });
});

router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedCategory = service.update(id, body);
        res.status(200).json({
            message: 'updated',
            data: updatedCategory
        });
    } catch (error) {
        // Si el servicio lanza un error (ej: categoría no encontrada), se captura aquí.
        res.status(404).json({ message: error.message });
    }
});

//  CAMBIO CLAVE 3: Lógica de negocio orquestada a través de servicios.
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. La ruta le pide al servicio de categorías que elimine la categoría.
        const result = service.delete(id);
        
        // 2. La ruta le pide al servicio de productos que elimine los productos asociados.
        const deletedProductsCount = productsService.deleteByCategoryId(id);

        // 3. La ruta construye y envía la respuesta final al cliente.
        res.status(200).json({ 
            message: `Deleted category and ${deletedProductsCount} associated products`,
            id: result.id
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;