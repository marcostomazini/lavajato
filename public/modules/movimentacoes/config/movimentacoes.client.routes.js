'use strict';

// Setting up route
angular.module('movimentacoes').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// Articles state routing
		$stateProvider.
		
		state('app.listTodosDepositos', {
			url: '/pesquisa-depositos',
			title: 'Listar Depositos',
			templateUrl: 'modules/movimentacoes/views/todos-depositos.client.view.html',
			resolve: helper.resolveFor('datatables', 'xeditable')
		}).

		state('app.listTodosServicos', {
			url: '/pesquisa-servicos',
			title: 'Listar Servicos',
			templateUrl: 'modules/movimentacoes/views/todos-servicos.client.view.html',
			resolve: helper.resolveFor('datatables', 'xeditable')
		}).

		state('app.listTodosPagamentos', {
			url: '/pesquisa-pagamentos',
			title: 'Listar Pagamentos',
			templateUrl: 'modules/movimentacoes/views/todos-pagamentos.client.view.html',
			resolve: helper.resolveFor('datatables', 'xeditable')
		});
	}
]);