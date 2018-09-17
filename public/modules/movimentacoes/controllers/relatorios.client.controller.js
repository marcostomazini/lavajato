'use strict';

angular.module('movimentacoes')	
    .controller('RelatoriosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Servicos', 
	'SweetAlert',
	'$modal',
	'$filter',
	function($scope, 
		$compile,
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		Servicos, 
		SweetAlert,
		$modal,
		$filter) {		

		$scope.authentication = Authentication;
		$scope.pesquisa = {};


		$scope.urlBase = '/#!/servicos';

		// Context
		$scope.authentication = Authentication;

		$scope.servicos = [
						        {
						            "dataHora": "1537044824738",
						            "totalDia": "150",
						            "servicos": [
						                {
						                	"placa": "EEE",
						                	"servico": "lavagem",
						                    "tipoPagamento": "Dinheiro",
						                    "valorRecebido": "5.00"
						                },
						                {
						                	"placa": "FFFF",
						                	"servico": "motor",
						                    "tipoPagamento": "Debito",
						                    "valorRecebido": "15.00"
						                },
						                {
						                	"placa": "WWWW",
						                	"servico": "chuva",
						                    "tipoPagamento": "Dinheiro",
						                    "valorRecebido": "25.00"
						                }
						            ]
						        },
						        {
						            "dataHora": "1537044824738",
						            "totalDia": "130",
						            "servicos": [
						                {
						                	"placa": "AAAA",
						                	"servico": "lavagem",
						                    "tipoPagamento": "Credito",
						                    "valorRecebido": "15.00"
						                },
						                {
						                	"placa": "BBBB",
						                	"servico": "ducha",
						                    "tipoPagamento": "Credito",
						                    "valorRecebido": "25.00"
						                },
						                {
						                	"placa": "CCCCC",
						                	"servico": "polimento",
						                    "tipoPagamento": "Dinheiro",
						                    "valorRecebido": "10.00"
						                }
						            ]
						        }
						    ];
		
		$scope.teste = function() {
			alert(1);
		};		
	}
]);