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

		$scope.tratarServicos = function() {
			

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

			$scope.totalServicosRelatorios = _.reduce($scope.relatorios, function(sum, n) {
			  return sum + parseFloat(n.valorRecebido);
			}, 0);
		};	

		$scope.servicos = {
							  "17/09": {
							    "Dinheiro": [
							      {
							        "_id": "5ba00263445bd813003d3415",
							        "__v": 0,
							        "dataHoraEntrada": "17/09",
							        "tipoPagamento": "Dinheiro",
							        "valorRecebido": "50.00",
							        "placa": "AAA-1111",
							        "tipoServico": "Lavagem"
							      }
							      ]
							  }
							};

		$scope.servicos2 = [
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