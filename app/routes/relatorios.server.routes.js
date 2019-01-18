'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	servicos = require('../../app/controllers/relatorios.server.controller');

module.exports = function(app) {

	app.route('/api/relatorios/todosServicos')
		.get(users.requiresLogin, servicos.todosServicos);
    app.route('/api/relatorios/servicos')
		.get(users.requiresLogin, servicos.servicos);
	app.route('/api/relatorios/pagamentos')
		.get(users.requiresLogin, servicos.pagamentos);
	app.route('/api/relatorios/lancamentos')
		.get(users.requiresLogin, servicos.lancamentos);
	app.route('/api/relatorios/fechamento')
		.get(users.requiresLogin, servicos.fechamento);

};