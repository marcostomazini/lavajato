'use strict';

angular.module('app.core').controller('HomeController', ['$scope', '$q', 'Authentication', 
	'Veiculos', 'Pagamentos', 'Depositos','Servicos', 'UsuariosSistema',
	function($scope, $q, Authentication, Veiculos, Pagamentos, Depositos, Servicos, UsuariosSistema) {
		
			

		/*		
		Veiculos.quantidade.get().$promise.then(function(data) {
			$scope.veiculos = data;
		});	

		var defer = $q.defer();
		Pagamentos.quantidade.get().$promise.then(function(data) {
			debugger;
			$scope.qtdePagamentos = data.data;
			//$scope.qtdePagamentos = 2;

			defer.resolve(data.data);
		});
		
		Pagamentos.quantidade.get().$promise.then(function(data) {
			$scope.qtdePagamentosTeste = data.length;
			$scope.qtdePagamentosTesteTeste = data.length;
		});

		*/
		
		Veiculos.veiculos.query().$promise.then(function(data) {
			$scope.qtdeVeiculos = data.length;
		});	

		UsuariosSistema.query().$promise.then(function(data) {
			$scope.qtdeUsuarios = data.length;
		});

		Pagamentos.pagamentos.query().$promise.then(function(data) {
			$scope.qtdePagamentos = data.length;
		});

		Depositos.depositos.query().$promise.then(function(data) {
			$scope.qtdeDepositos = data.length;
		});

		Servicos.servicos.query().$promise.then(function(data) {
			$scope.qtdeServicos = data.length;
		});

	}
]);