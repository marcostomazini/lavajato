'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	pagamentos = require('../../app/controllers/pagamentos.server.controller');

module.exports = function(app) {

	app.route('/api/mobile/pagamentos')
		.get(passport.authenticate('bearer', {
        	session: false
    	}), pagamentos.listMobile)
		.post(passport.authenticate('bearer', {
        	session: false
    	}), pagamentos.create);

    app.route('/api/mobile/pagamento/:pagamentoId')
    	.get(passport.authenticate('bearer', {
        	session: false
    	}), pagamentos.read)
    	.put(passport.authenticate('bearer', {
        	session: false
    	}), pagamentos.update)
    	.delete(passport.authenticate('bearer', {
        	session: false
    	}), pagamentos.delete);


	app.route('/api/pagamentos')
		.get(users.requiresLogin, pagamentos.listAll)
		.post(users.requiresLogin, pagamentos.create);    	

	app.route('/api/pesquisa/pagamentos')
		.get(users.requiresLogin, pagamentos.count)
		.post(users.requiresLogin, pagamentos.listDatatables);

	app.route('/api/pagamento/:pagamentoId')
		.get(users.requiresLogin, pagamentos.read)
		.put(users.requiresLogin, pagamentos.hasAuthorization, pagamentos.update)
		.delete(users.requiresLogin, pagamentos.hasAuthorization, pagamentos.delete);

	// Finish by binding the article middleware
	app.param('pagamentoId', pagamentos.pagamentoByID);
};