'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('movimentacoes').factory('Relatorios', ['$resource',
	function($resource) {

		var Relatorios = $resource('api/relatorios');
			
    	return {
    		relatorios: Relatorios
    	};
	}
]);