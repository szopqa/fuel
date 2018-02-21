'use strict';
const usersController = require('./controllers/usersController');
const vehiclesController = require('./controllers/vehiclesController');
const transactionsController = require('./controllers/transactionsController');
const authenticate = require('../middleware/authentication');
const noCache = require('../middleware/noCache');

module.exports = (app) => {
    app.post('/users', usersController.addNewUser);
    app.post('/users/login', usersController.loginUser);
    app.delete('/users/logout', authenticate, usersController.logoutUser);

    app.get('/users/me', authenticate, noCache, usersController.getLoggedUser);
    app.get('/users/:id', authenticate, usersController.getUserById);
    app.delete('/users/:id', authenticate, usersController.deleteUser);

    app.post('/vehicles', authenticate, vehiclesController.addNewVehicle);
    app.get('/vehicles', authenticate, vehiclesController.getUserVehicles);
    app.delete('/vehicles/:id', authenticate, vehiclesController.deleteVehicle);

    app.post('/user/transactions', authenticate, transactionsController.addNewTransaction);
    app.get('/user/transactions', authenticate, transactionsController.getUserTransactions);
    app.get('/user/transactions/:id', authenticate, transactionsController.getTransactionById);
    app.delete('/user/transactions/:id', authenticate,transactionsController.deleteTransaction);
};