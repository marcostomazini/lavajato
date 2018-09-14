'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	servicos = require('../../app/controllers/servicos.server.controller');

module.exports = function(app) {

	app.route('/api/mobile/servicos')
		.get(passport.authenticate('bearer', {
        	session: false
    	}), servicos.listMobile)
		.post(passport.authenticate('bearer', {
        	session: false
    	}), servicos.create);

    app.route('/api/mobile/servico/:servicoId')
    	.get(passport.authenticate('bearer', {
        	session: false
    	}), servicos.read)
    	.put(passport.authenticate('bearer', {
        	session: false
    	}), servicos.update)
    	.delete(passport.authenticate('bearer', {
        	session: false
    	}), servicos.delete);


	app.route('/api/servicos')
		.get(users.requiresLogin, servicos.listAll)
		.post(users.requiresLogin, servicos.create);    	

	app.route('/api/pesquisa/servicos')
		.get(users.requiresLogin, servicos.count)
		.post(users.requiresLogin, servicos.listDatatables);

	app.route('/api/servico/:servicoId')
		.get(users.requiresLogin, servicos.read)
		.put(users.requiresLogin, servicos.hasAuthorization, servicos.update)
		.delete(users.requiresLogin, servicos.hasAuthorization, servicos.delete);

	// Finish by binding the article middleware
	app.param('servicoId', servicos.servicoByID);
};