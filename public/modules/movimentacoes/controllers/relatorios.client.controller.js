'use strict';

angular.module('movimentacoes')	
    .controller('RelatoriosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Relatorios', 
	'SweetAlert',
	'$modal',
	'$filter',
	function($scope, 
		$compile,
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		Relatorios, 
		SweetAlert,
		$modal,
		$filter) {		

		$scope.authentication = Authentication;
		$scope.pesquisa = {};
		$scope.servicosRelatorios = {};
		$scope.pagamentosRelatorios = {};
		$scope.lancamentosRelatorios = {};
		$scope.resumoFechamento = {};
		$scope.contatos = {};

		$scope.relatorioAtivo = {};
		$scope.pesquisa.mes = new Date();

		// Context
		$scope.authentication = Authentication;		

		//$scope.relatorioPagamento = Relatorios.pagamentos.query();

		$scope.openMes = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();

	    	$scope.openedMes = true;
		};

		//region Servicos

		$scope.agruparPorDataTipoPagamento = function() {
			var listaDataFormatada = _.map($scope.relatorios, function(item) {
				var unixDate = parseInt(item.dataHoraEntrada);
    			var dataEntrada = moment(unixDate).format('DD/MM');
				item.dataHoraEntrada = dataEntrada;

				return item;
			});

			var agrupados = _.groupBy(listaDataFormatada, function(b) { 
				return b.dataHoraEntrada;
			});

			_.forEach(agrupados, function(value, key) {
			  agrupados[key] = _.groupBy(agrupados[key], function(item) {
			    return item.tipoPagamento;
			  });
			});
		
			$scope.servicosRelatorios = agrupados;	
		}

		$scope.totais = function() {
			$scope.totalServicosRelatorios = [];

			var agrupadosTipoPagamento = _.groupBy($scope.relatorios, function(b) { 
				return b.tipoPagamento;
			});

			_.forEach(agrupadosTipoPagamento, function(value, key) {
			  var totalPorTipoPagamento = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valorRecebido);
				}, 0);

			  $scope.totalServicosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipoPagamento
			  	}
			  );
			});

			var totalGeral = _.reduce($scope.relatorios, function(sum, n) {
				return sum + parseFloat(n.valorRecebido);
			}, 0);

			$scope.totalServicosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioServico = function() {
			$scope.relatorioAtivo = 'servico';
			var _this = this;
			Relatorios.servicos.query({data: $scope.pesquisa.mes}, function success(data){
				debugger
				$scope.relatorios = _.where(data, { situacao: 'Pago'});
				_this.agruparPorDataTipoPagamento();
				_this.totais();
				}, function error(error){
			});
		};	

		//endregion Servicos

		//region Pagamentos

		$scope.agruparPorDataTipoPagamentoPagamento = function(data) {
			var listaDataFormatada = _.map(data, function(item) {
				var unixDate = parseInt(item.dataPagamento);
    			var dataEntrada = moment(unixDate).format('DD/MM');
				item.dataPagamento = dataEntrada;

				return item;
			});

			var agrupados = _.groupBy(listaDataFormatada, function(b) { 
				return b.dataPagamento;
			});

			_.forEach(agrupados, function(value, key) {
			  agrupados[key] = _.groupBy(agrupados[key], function(item) {
			    return item.tipoPagamento;
			  });
			});
		
			$scope.pagamentosRelatorios = agrupados;	
		}

		$scope.totaisPagamentos = function(data) {
			$scope.totalPagamentosRelatorios = [];

			var agrupadosTipoPagamento = _.groupBy(data, function(b) { 
				return b.tipoPagamento;
			});

			_.forEach(agrupadosTipoPagamento, function(value, key) {
			  var totalPorTipoPagamento = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valor);
				}, 0);

			  $scope.totalPagamentosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipoPagamento
			  	}
			  );
			});

			var totalGeral = _.reduce(data, function(sum, n) {
				return sum + parseFloat(n.valor);
			}, 0);

			$scope.totalPagamentosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioPagamento = function() {
			$scope.relatorioAtivo = 'pagamento';
			var _this = this;
			Relatorios.pagamentos.query({data: $scope.pesquisa.mes}, function success(data){
				_this.agruparPorDataTipoPagamentoPagamento(data);
				_this.totaisPagamentos(data);
				}, function error(error){
			});
		};	

		//endregion Pagamentos

		//region Lancamentos

		$scope.agruparPorDataTipoLancamento = function(data) {
			var listaDataFormatada = _.map(data, function(item) {
				var unixDate = parseInt(item.dataDeposito);
    			var dataEntrada = moment(unixDate).format('DD/MM');
				item.dataDeposito = dataEntrada;

				return item;
			});

			var agrupados = _.groupBy(listaDataFormatada, function(b) { 
				return b.dataDeposito;
			});

			_.forEach(agrupados, function(value, key) {
			  agrupados[key] = _.groupBy(agrupados[key], function(item) {
			    return item.tipoLancamento;
			  });
			});
		
			$scope.lancamentosRelatorios = agrupados;	
		}

		$scope.totaisLancamentos = function(data) {
			$scope.totalLancamentosRelatorios = [];

			var agrupadosTipoLancamento = _.groupBy(data, function(b) { 
				return b.tipoLancamento;
			});

			_.forEach(agrupadosTipoLancamento, function(value, key) {
			  var totalPorTipo = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valor);
				}, 0);

			  $scope.totalLancamentosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipo
			  	}
			  );
			});

			var totalGeral = _.reduce(data, function(sum, n) {
				return sum + parseFloat(n.valor);
			}, 0);

			$scope.totalLancamentosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioLancamento = function() {
			$scope.relatorioAtivo = 'lancamento';
			var _this = this;
			Relatorios.lancamentos.query({data: $scope.pesquisa.mes}, function success(data){
				_this.agruparPorDataTipoLancamento(data);
				_this.totaisLancamentos(data);
				}, function error(error){
			});
		};	

		//endregion Lancamentos

		//region Fechamento

		$scope.realizarFechamento = function(servicos, pagamentos, lancamentos) {
			var totalServico = _.findWhere(servicos, { tipo: 'Geral'});
			var totalPagamento = _.findWhere(pagamentos, { tipo: 'Geral'});
			var totalLancamento = _.findWhere(lancamentos, { tipo: 'Geral'});

			var lucro = (totalServico.valorTotal - totalPagamento.valorTotal);

			var valorDivergente = lucro - totalLancamento.valorTotal;
			var periodo = moment($scope.pesquisa.mes).format('MM/YYYY');

			$scope.resumoFechamento = {
				periodo: periodo,
				servico: totalServico.valorTotal,
				pagamento: totalPagamento.valorTotal,
				lancamento: totalLancamento.valorTotal,
				lucro: lucro,
				lucroBateu: (lucro == totalLancamento.valorTotal),
				diferenca: valorDivergente
			};
		};

		$scope.gerarRelatorioFechamento = function() {
			$scope.relatorioAtivo = 'fechamento';
			var _this = this;

			Relatorios.servicos.query({data: $scope.pesquisa.mes}, function success(data1){
					$scope.relatorios = _.where(data1, { situacao: 'Pago'});
					_this.totais();
					Relatorios.pagamentos.query({data: $scope.pesquisa.mes}, function success(data2){
							_this.totaisPagamentos(data2);
							Relatorios.lancamentos.query({data: $scope.pesquisa.mes}, function success(data3){
								_this.totaisLancamentos(data3);

								_this.realizarFechamento($scope.totalServicosRelatorios, 
									$scope.totalPagamentosRelatorios, 
									$scope.totalLancamentosRelatorios);

								}, function error(error){
							});
						}, function error(error){
					});					
				}, function error(error){
			});			
		};	

		//endregion Fechamento

		//#region Contatos
		$scope.gerarRelatorioContatos = function() {
			$scope.relatorioAtivo = 'contatos';
			var _this = this;

			Relatorios.todosServicos.query({}, function success(data){
					$scope.contatos = 
					{ 
						quantidade: _.size(data),
						contatos: [],
						contatosUnicos: _.uniq(_.pluck(data, 'celular'))
					};

					_.each(data, function(value, name){
						$scope.contatos.contatos.push({
					        cliente: value.nomeCliente,
					        celular: value.celular
					    });
					});
					
				}, function error(error){
			});			
		};	
		//endregion Contatos
	}
]);