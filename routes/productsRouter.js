const express = require('express');
const ProductsService = require('../services/productsServices'); // Corregido el nombre
const router = express.Router();

// 1. Instanciamos el servicio. Ya no hay un array local 'products'.
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.getAll();
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.getById(id);
  if (product) {
      res.status(200).json(product);
  } else {
      res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json({
    message: 'created',
    data: newProduct
  });
});

router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = service.update(id, body);
        res.json({
            message: 'updated',
            data: product
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const result = service.delete(id);
        res.json({
            message: 'deleted',
            ...result
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

// 2. Exportamos solo el router. El array de productos ahora es privado del servicio.
// ¡PERO! Para que las otras rutas funcionen, necesitamos acceso al servicio de productos.
// Lo exportaremos para que las otras rutas puedan importarlo.
module.exports = {
  router,
  service // Exportamos la instancia del servicio
};