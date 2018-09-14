'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	configuracoes = require('../../app/controllers/configuracoes.server.controller');

module.exports = function(app) {

	app.route('/api/mobile/configuracoes')
		.get(passport.authenticate('bearer', {
        	session: false
    	}), configuracoes.listAll)
		.post(passport.authenticate('bearer', {
        	session: false
    	}), configuracoes.create);

    app.route('/api/mobile/configuracao/:configuracaoId')
    	.get(passport.authenticate('bearer', {
        	session: false
    	}), configuracoes.read)
    	.put(passport.authenticate('bearer', {
        	session: false
    	}), configuracoes.update)
    	.delete(passport.authenticate('bearer', {
        	session: false
    	}), configuracoes.delete);


	app.route('/api/configuracoes')
		.get(users.requiresLogin, configuracoes.list)
		.post(users.requiresLogin, configuracoes.create);    	

	app.route('/api/pesquisa/configuracoes')
		.get(users.requiresLogin, configuracoes.count)
		.post(users.requiresLogin, configuracoes.list);

	app.route('/api/configuracao/:configuracaoId')
		.get(users.requiresLogin, configuracoes.read)
		.put(users.requiresLogin, configuracoes.hasAuthorization, configuracoes.update)
		.delete(users.requiresLogin, configuracoes.hasAuthorization, configuracoes.delete);

	// Finish by binding the article middleware
	app.param('configuracaoId', configuracoes.configuracaoByID);
};