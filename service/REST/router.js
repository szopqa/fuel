'use strict';
const usersController = require('./controllers/usersController');
const vehiclesController = require('./controllers/vehiclesController');
const transactionsController = require('./controllers/transactionsController');
const authenticate = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/users', usersController.addNewUser);
    app.get('/users/me', authenticate, usersController.getLoggedUser);
    app.get('/users/:id', authenticate, usersController.getUserById);
    app.delete('/users/:id', authenticate, usersController.deleteUser);

    app.post('/users/:id/vehicles', authenticate, vehiclesController.addNewVehicle);
    app.get('/users/:id/vehicles/:id', authenticate, vehiclesController.getVehicleById);
    app.delete('/users/:id/vehicles/:id', authenticate, vehiclesController.deleteVehicle);

    app.post('/users/:id/transactions', authenticate, transactionsController.addNewTransaction);
    app.get('/users/:id/transactions/:id', authenticate, transactionsController.getTransactionById);
    app.delete('/users/:id/transactions/:id', authenticate,transactionsController.deleteTransaction);
};