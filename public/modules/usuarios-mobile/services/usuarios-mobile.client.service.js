'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('usuarios-mobile').factory('UsuariosMobile', ['$resource',

	function($resource) {

		var PreencherDados = $resource('api/leilao-validar-url/:url', {
			url: '@_url'
		}, {
			validar: {
				method: 'POST'
			}
		});

		var leilao = $resource('api/usuarios-mobile/:usuarioMobileId', {
			usuarioMobileId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});


		return {
    		leilao: leilao,
    		preencherDados: PreencherDados
    	};
	}
]);