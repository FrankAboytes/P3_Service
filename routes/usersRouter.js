    const express = require('express');
    const UsersService = require('../services/userServices'); // 1. Importar el servicio
    const router = express.Router();

    const service = new UsersService(); // 2. Crear una instancia del servicio

    // El router ahora es simple. Solo llama al servicio y responde.
    router.get('/', (req, res) => {
    const users = service.getAll();
    res.status(200).json(users);
    });

    router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = service.getById(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    });

    router.post('/', (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json({
        message: 'created',
        data: newUser
    });
    });

    router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedUser = service.update(id, body);
        res.status(200).json({
        message: 'updated',
        data: updatedUser
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    });

    router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const result = service.delete(id);
        res.status(200).json({
        message: 'deleted',
        ...result
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    });

    module.exports = router;