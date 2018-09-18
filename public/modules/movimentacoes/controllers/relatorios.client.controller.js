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


		$scope.urlBase = '/#!/servicos';

		// Context
		$scope.authentication = Authentication;

		$scope.relatorios = Relatorios.relatorios.query();

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
			this.agruparPorDataTipoPagamento();

			this.totais();			
		};	
	}
]);