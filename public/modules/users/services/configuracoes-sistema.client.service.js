'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('ConfiguracoesSistema', ['$resource',
	function($resource) {
		return $resource('api/configuracoes/:configuracaoId', {
			usuarioSistemaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);