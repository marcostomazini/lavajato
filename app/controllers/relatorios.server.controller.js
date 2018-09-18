'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Servico = mongoose.model('Servico'),
	ObjectId = mongoose.Types.ObjectId,	
	_ = require('lodash');


exports.relatorios = function(req, res) {	

	var dataAtual = new Date();
	var anoAtual = dataAtual.getUTCFullYear();
	var mesAtual = (dataAtual.getUTCMonth());
	var diaAtual = dataAtual.getUTCDate();
	var ultimoDiaDataMes = new Date(anoAtual, dataAtual.getMonth()+1, 0);
	var ultimoDiaMes = ultimoDiaDataMes.getUTCDate();
	
	var dataCompiladaInicio = new Date(anoAtual, mesAtual, 1);
	var dataCompiladaFim = new Date(anoAtual, mesAtual, ultimoDiaMes, 23, 59, 59);	

	var dataPesquisaInicio = dataCompiladaInicio.setDate(dataCompiladaInicio.getDate());
	var dataPesquisaFim = dataCompiladaFim.setDate(dataCompiladaFim.getDate());

	Servico.find({ 
					dataHoraEntrada: { 
						$lte: dataPesquisaFim, 
						$gte: dataPesquisaInicio
					}
				 }, 
			'-updated -created -situacao -observacao -celular -nomeCliente -dataHoraSaida')
		.sort('-created')		
		.exec(function(err, servicos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {			
			res.json(servicos);
		}
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