'use strict';
const usersController = require('./controllers/usersController');
const vehiclesController = require('./controllers/vehiclesController');
const transactionsController = require('./controllers/transactionsController');

module.exports = (app) => {
    app.post('/users', usersController.addNewUser);
    app.get('/users/:id', usersController.getUserById);
    app.delete('/users/:id', usersController.deleteUser);

    app.post('/users/:id/vehicles', vehiclesController.addNewVehicle);
    app.get('/users/:id/vehicles/:id', vehiclesController.getVehicleById);
    app.post('/users/:id/vehicles/:id', vehiclesController.deleteVehicle);

    app.post('/users/:id/transactions', transactionsController.addNewTransaction);
    app.get('/users/:id/transactions/:id', transactionsController.getTransactionById);
    app.delete('/users/:id/transactions/:id', transactionsController.deleteTransaction);
};