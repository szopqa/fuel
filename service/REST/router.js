'use strict';
const usersController = require('./controllers/usersController');
const vehiclesController = require('./controllers/vehiclesController');
const transactionsController = require('./controllers/transactionsController');
const authenticate = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/users', usersController.addNewUser);
    app.post('/users/login', usersController.loginUser);
    app.delete('/users/logout', authenticate, usersController.logoutUser);

    app.get('/users/me', authenticate, usersController.getLoggedUser);
    app.get('/users/:id', authenticate, usersController.getUserById);
    app.delete('/users/:id', authenticate, usersController.deleteUser);

    app.post('/vehicles', authenticate, vehiclesController.addNewVehicle);
    app.get('/vehicles/:id', authenticate, vehiclesController.getVehicleById);
    app.delete('/vehicles/:id', authenticate, vehiclesController.deleteVehicle);

    app.post('/users/:id/transactions', authenticate, transactionsController.addNewTransaction);
    app.get('/users/:id/transactions/:id', authenticate, transactionsController.getTransactionById);
    app.delete('/users/:id/transactions/:id', authenticate,transactionsController.deleteTransaction);
};