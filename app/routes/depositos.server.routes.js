'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	depositos = require('../../app/controllers/depositos.server.controller');

module.exports = function(app) {

	app.route('/api/mobile/depositos')
		.get(passport.authenticate('bearer', {
        	session: false
    	}), depositos.listMobile)
		.post(passport.authenticate('bearer', {
        	session: false
    	}), depositos.create);

    app.route('/api/mobile/deposito/:depositoId')
    	.get(passport.authenticate('bearer', {
        	session: false
    	}), depositos.read)
    	.put(passport.authenticate('bearer', {
        	session: false
    	}), depositos.update)
    	.delete(passport.authenticate('bearer', {
        	session: false
    	}), depositos.delete);


	app.route('/api/depositos')
		.get(users.requiresLogin, depositos.listAll)
		.post(users.requiresLogin, depositos.create);    	

	app.route('/api/pesquisa/depositos')
		.get(users.requiresLogin, depositos.count)
		.post(users.requiresLogin, depositos.listDatatables);

	app.route('/api/deposito/:depositoId')
		.get(users.requiresLogin, depositos.read)
		.put(users.requiresLogin, depositos.hasAuthorization, depositos.update)
		.delete(users.requiresLogin, depositos.hasAuthorization, depositos.delete);

	// Finish by binding the article middleware
	app.param('depositoId', depositos.depositoByID);
};