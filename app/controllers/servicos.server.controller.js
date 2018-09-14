'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Servico = mongoose.model('Servico'),
	Configuracao = mongoose.model('Configuracao'),
	ObjectId = mongoose.Types.ObjectId,	
	_ = require('lodash');

/**
 * Create a Servico
 */
exports.create = function(req, res) {
	var self = this;
	var servico = new Servico(req.body);

	servico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {		
	    	var socketio = req.app.get('socketio');
			socketio.emit('message-toaster', {				
				type: 'info',
				title: 'Novo servico',
				message: servico.nomeCliente + ' - ' + servico.placa
			});

			res.json(servico);				
		}
	});
};

/**
 * Show the current servico
 */
exports.read = function(req, res) {
	res.json(req.servico);
};

/**
 * Update a servico
 */
exports.update = function(req, res) {
	var servico = req.servico;

	servico = _.extend(servico, req.body);

	servico.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servico);
		}
	});
};

/**
 * Delete an servico
 */
exports.delete = function(req, res) {
	var servico = req.servico;

	servico.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servico);
		}
	});
};

/**
 * List of veiculos
 */
exports.listDatatables = function(req, res) {	
	var datatablesQuery = require('datatables-query'),
        params = req.body,
        query = datatablesQuery(Servico);
 
    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {
        return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
    });
};

exports.listMobile = function(req, res) {	
	Configuracao.findOne({ nome: 'SERVICOS_DIAS'}, '-updated -created')
		.exec(function(err, configuracao) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var dataAtual = new Date();
			var anoAtual = dataAtual.getUTCFullYear();
			var mesAtual = (dataAtual.getUTCMonth());
			var diaAtual = dataAtual.getUTCDate();

			var dataCompiladaInicio = new Date(anoAtual, mesAtual, diaAtual);
			var dataCompiladaFim = new Date(anoAtual, mesAtual, diaAtual, 23, 59, 59);
		
			var dataPesquisaInicio = dataCompiladaInicio.setDate(dataCompiladaInicio.getDate() - parseInt(configuracao.valor));
			var dataPesquisaFim = dataCompiladaFim.setDate(dataCompiladaFim.getDate());

			Servico.find({ 
							dataHoraEntrada: { 
								$lte: dataPesquisaFim, 
								$gte: dataPesquisaInicio  
							}
						 }, 
					'-updated -created').sort('-created').exec(function(err, servicos) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(servicos);
				}
			});
		}
	});	
};

exports.listAll = function(req, res) {	
	Servico.find({}, '-updated -created')
		.sort('-created').exec(function(err, servicos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(servicos);
		}
	});	
};

/**
 * List of servicos
 */
exports.count = function(req, res) {	
	Servico.find().count().exec(function(err, qtde) {
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
 * servico middleware
 */
exports.servicoByID = function(req, res, next, id) {
	Servico.findById(id).exec(function(err, servico) {
		if (err) return next(err);
		if (!servico) //return next(new Error('Failed to load servico ' + id));
			return res.status(400).send(errorHandler.registroNaoEncontrado(id));
		req.servico = servico;
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