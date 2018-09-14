'use strict';

// Configuring the Articles module
angular.module('movimentacoes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Movimentações', 'pesquisa-servicos', 'dropdown', '/pesquisa-servicos(/.*)?', false, null, 20, 'icon-lock');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Serviços', 'pesquisa-servicos');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Pagamentos', 'pesquisa-pagamentos');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Depositos', 'pesquisa-depositos');
	}
]);