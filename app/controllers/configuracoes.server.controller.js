'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Configuracao = mongoose.model('Configuracao'),
	ObjectId = mongoose.Types.ObjectId,
	_ = require('lodash');

/**
 * Create a configuracao
 */
exports.create = function(req, res) {
	var self = this;
	var configuracao = new Configuracao(req.body);

	configuracao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {		
	    	var socketio = req.app.get('socketio');
			socketio.emit('message-toaster', {				
				type: 'info',
				title: 'Novo configuracao',
				message: 'configuracao Cadastrado ' + configuracao.nome
			});

			res.json(configuracao);				
		}
	});
};

/**
 * Show the current configuracao
 */
exports.read = function(req, res) {
	res.json(req.configuracao);
};

/**
 * Update a configuracao
 */
exports.update = function(req, res) {
	var configuracao = req.configuracao;

	configuracao = _.extend(configuracao, req.body);

	configuracao.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(configuracao);
		}
	});
};

/**
 * Delete an configuracao
 */
exports.delete = function(req, res) {
	var configuracao = req.configuracao;

	configuracao.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(configuracao);
		}
	});
};

/**
 * List of configuracoes
 */
exports.list = function(req, res) {			
	Configuracao
		.find({})
		.sort('-created')
		.exec(function(err, usuariosMobile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usuariosMobile);
		}
	});
};

exports.listAll = function(req, res) {	
	Configuracao.find({}, '-updated -created')
		.sort('-created').exec(function(err, configuracoes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(configuracoes);
		}
	});
};

/**
 * List of configuracoes
 */
exports.count = function(req, res) {	
	Configuracao.find().count().exec(function(err, qtde) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(qtde);
			res.json(qtde);
		}
	});
};

/**
 * configuracao middleware
 */
exports.configuracaoByID = function(req, res, next, id) {
	Configuracao.findById(id).exec(function(err, configuracao) {
		if (err) return next(err);
		if (!configuracao) return res.status(400).send(errorHandler.registroNaoEncontrado(id));
		req.configuracao = configuracao;
		next();		
	});
};

exports.hasAuthorization = function(req, res, next) {
	// if (req.article.user.id !== req.user.id) {
	// 	return res.status(403).send({
	// 		message: 'User is not authorized'
	// 	});
	// }
	next();
};