'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport'),
	servicos = require('../../app/controllers/relatorios.server.controller');

module.exports = function(app) {

    app.route('/api/relatorios')
		.get(users.requiresLogin, servicos.relatorios);

};