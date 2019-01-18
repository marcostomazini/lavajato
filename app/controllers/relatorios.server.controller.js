'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Servico = mongoose.model('Servico'),
	Pagamento = mongoose.model('Pagamento'),
	Lancamento = mongoose.model('Deposito'),	
	ObjectId = mongoose.Types.ObjectId,	
	_ = require('lodash');

exports.todosServicos = function(req, res) {	
	Servico.find({}, '-updated -created -observacao -dataHoraSaida -tipoPagamento -tipoServico -valorRecebido -situacao')
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

exports.servicos = function(req, res) {	
	var dataAtual = new Date(req.query.data);
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
			'-updated -created -observacao -celular -nomeCliente -dataHoraSaida')
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

exports.pagamentos = function(req, res) {	
	var dataAtual = new Date(req.query.data);
	var anoAtual = dataAtual.getUTCFullYear();
	var mesAtual = (dataAtual.getUTCMonth());
	var diaAtual = dataAtual.getUTCDate();
	var ultimoDiaDataMes = new Date(anoAtual, dataAtual.getMonth()+1, 0);
	var ultimoDiaMes = ultimoDiaDataMes.getUTCDate();
	
	var dataCompiladaInicio = new Date(anoAtual, mesAtual, 1);
	var dataCompiladaFim = new Date(anoAtual, mesAtual, ultimoDiaMes, 23, 59, 59);	

	var dataPesquisaInicio = dataCompiladaInicio.setDate(dataCompiladaInicio.getDate());
	var dataPesquisaFim = dataCompiladaFim.setDate(dataCompiladaFim.getDate());

	Pagamento.find({ 
					dataPagamento: { 
						$lte: dataPesquisaFim, 
						$gte: dataPesquisaInicio
					},
					excluido: false
				 }, 
			'-updated -created')
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

exports.lancamentos = function(req, res) {	
	var dataAtual = new Date(req.query.data);
	var anoAtual = dataAtual.getUTCFullYear();
	var mesAtual = (dataAtual.getUTCMonth());
	var diaAtual = dataAtual.getUTCDate();
	var ultimoDiaDataMes = new Date(anoAtual, dataAtual.getMonth()+1, 0);
	var ultimoDiaMes = ultimoDiaDataMes.getUTCDate();
	
	var dataCompiladaInicio = new Date(anoAtual, mesAtual, 1);
	var dataCompiladaFim = new Date(anoAtual, mesAtual, ultimoDiaMes, 23, 59, 59);	

	var dataPesquisaInicio = dataCompiladaInicio.setDate(dataCompiladaInicio.getDate());
	var dataPesquisaFim = dataCompiladaFim.setDate(dataCompiladaFim.getDate());

	Lancamento.find({ 
					dataDeposito: { 
						$lte: dataPesquisaFim, 
						$gte: dataPesquisaInicio
					},
					excluido: false
				 }, 
			'-updated -created')
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

exports.fechamento = function(req, res) {	
	// not implemented
};

exports.hasAuthorization = function(req, res, next) {
	// if (req.article.user.id !== req.user.id) {
	// 	return res.status(403).send({
	// 		message: 'User is not authorized'
	// 	});
	// }
	next();
};