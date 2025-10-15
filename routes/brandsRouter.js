const express = require('express');
const BrandsService = require('../services/brandsServices');

// CAMBIO CLAVE 1: Importamos el servicio de productos para el borrado en cascada.
const { service: productsService } = require('./productsRouter'); 
const router = express.Router();

//  CAMBIO CLAVE 2: Creamos una instancia del servicio que manejará la lógica.
const service = new BrandsService();

//ENDPOINTS SIMPLIFICADOS
// La ruta solo llama al método del servicio correspondiente.
router.get('/', (req, res) => {
    const brands = service.getAll();
    res.status(200).json(brands);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = service.getById(id);
    if (brand) {
        res.status(200).json(brand);
    } else {
        res.status(404).json({ message: 'Brand not found' });
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    const newBrand = service.create(body);
    res.status(201).json({
        message: 'created',
        data: newBrand
    });
});

router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedBrand = service.update(id, body);
        res.status(200).json({
            message: 'updated',
            data: updatedBrand
        });
    } catch (error) {
        res.status(444).json({ message: error.message });
    }
});

//  CAMBIO CLAVE 3: El router orquesta la lógica entre los dos servicios.
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Pide al servicio de marcas que elimine la marca.
        const result = service.delete(id);
        
        // 2. Pide al servicio de productos que elimine los productos de esa marca.
        const deletedProductsCount = productsService.deleteByBrandId(id);

        // 3. Envía una respuesta consolidada.
        res.status(200).json({ 
            message: `Deleted brand and ${deletedProductsCount} associated products`,
            id: result.id
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;