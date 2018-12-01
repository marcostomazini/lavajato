'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('movimentacoes').factory('Relatorios', ['$resource',
	function($resource) {

		var Servicos = $resource('api/relatorios/servicos');
		var Pagamentos = $resource('api/relatorios/pagamentos');
		var Lancamentos = $resource('api/relatorios/lancamentos');
		var Fechamento = $resource('api/relatorios/fechamento');
			
    	return {
    		servicos: Servicos,
    		pagamentos: Pagamentos,
    		lancamentos: Lancamentos,
    		fechamento: Fechamento
    	};
	}
]);