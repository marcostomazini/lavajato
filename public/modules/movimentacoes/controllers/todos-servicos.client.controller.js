'use strict';

angular.module('movimentacoes')	
    .controller('ServicosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Servicos', 
	'DTOptionsBuilder', 
	'DTColumnBuilder', 
	'SweetAlert',
	'$modal',
	'$filter',
	'$window', 
	function($scope, 
		$compile,
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		Servicos, 
		DTOptionsBuilder, 
		DTColumnBuilder,
		SweetAlert,
		$modal,
		$filter,
		$window) {		

		$scope.authentication = Authentication;
		$scope.pesquisa = {};

		var createdRow = function(row, data, dataIndex) {
        	// Recompiling so we can bind Angular directive to the DT
        	$compile(angular.element(row).contents())($scope);
    	}

		var statusHtml = function(data, type, full, meta) {

			var div = "";
			if (data.observacao) {
		        div = '<div class="label label-danger">Tem Observação</div><br>';			    
			} else {
			    div = '<div class="label label-info">Sem Observação</div><br>';
			}

			switch(data.tipoPagamento) {
			    case 'Dinheiro':
			        return div + '<div class="label label-success">Dinheiro</div>';
			    case 'Debito':
			        return div + '<div class="label label-info">Debito</div>';
			    case 'Credito':
			        return div + '<div class="label label-warning">Credito</div>';
			    case 'Outros':
			        return div + '<div class="label label-warning">Outros</div>';			    
			    default:
			        return div + '<div class="label label-danger">NONE</div>';
			}			
		}

		//'Fila', 'Atendimento', 'Finalizado', 'Pago', 'Outros'
		var situacaoHtml = function(data, type, full, meta) {
			switch(data.situacao) {
			    case 'Fila':
			        return '<div class="label label-warning">Fila</div>';
			    case 'Atendimento':
			        return '<div class="label label-info">Atendimento</div>';
			    case 'Finalizado':
			        return '<div class="label label-success">Finalizado</div>';
			    case 'Pago':
			        return '<div class="label label-success">Pago</div>';
			    case 'Outros':
			        return '<div class="label label-warning">Outros</div>';
			    default:
			        return '<div class="label label-danger">NONE</div>';
			}			
		}

		var visualizarHtml = function(data, type, full, meta) {			
			var item = full;
			return "<div class=\"row\">"+
					"	<div class=\"text-center\">"+
					"		<div class=\"text-center\""+
					"			popover=\"Visualizar\""+
					"			popover-trigger=\"mouseenter\">"+
					"			<a ng-click=\"visualizar('"+item._id+"')\">"+
					"				<i class=\"fa icon-eyeglasses fa-2x\"></i>"+
					"			</a>"+
					"		</div>"+
					"	</div>"+
					"</div>";
		}

		var celularHtml = function(data, type, full, meta) {	
			var item = full;
			return "<div class=\"row\">"+ 
					"	<div class=\"text-center\">"+ 
					"		<div class=\"text-center\""+
					"			popover='" + item.celular + "'" +
					"			popover-trigger=\"mouseenter\">" + item.celular +
					"			<a ng-click=\"whatsapp('"+item.celular+"')\">"+
					"				<i class=\"fa fa-whatsapp fa-2x\"></i>"+
					"			</a>"+
					"		</div>"+
					"	</div>"+
					"</div>";
		}

		//https://api.whatsapp.com/send?phone=5544999159296&text=Olá, tudo bem? Vi seu perfil no http://fatalmodel.com/188319%0aConfirmando então%0a*Cachê:* R$150 (1 hora)%0a*Pagamento:* Dinheiro.%0a*Em:* Local próprio, Motéis.%0a%0aVou ser bem objetivo 🙂, minha dúvida é:

		this.dtOptions = DTOptionsBuilder
			.newOptions()			
	    	.withOption('ajax', {
	    		dataSrc: 'data',
	        	url: '/api/pesquisa/servicos',
	        	type: 'POST'
	    	})
	    	.withOption('createdRow', createdRow)
	    	.withOption('bFilter', false)
	    	.withOption('processing', true)
	    	.withOption('serverSide', true)
	    	.withOption('fnServerParams', function (aoData) {
                aoData.searchCustom = [{
                    "name": "nome",
                    "value": $scope.pesquisa.nome || ''
                },{
                    "name": "ano",
                    "value": $scope.pesquisa.ano || ''
                },{
                    "name": "cor",
                    "value": $scope.pesquisa.cor || ''
                },{
                    "name": "placa",
                    "value": $scope.pesquisa.placa || ''
                },{
                    "name": "status",
                    "value": $scope.pesquisa.status || ''
                },{
                    "name": "leilao.date",
                    "value": $scope.pesquisa.dataDe || ''
                }];
            })
		    .withPaginationType('full_numbers')		    
		    .withLanguageSource('/server/pt-br.json');

	    this.dtColumns = [
	    	DTColumnBuilder.newColumn('nomeCliente').withTitle('#').notVisible(),
	    	DTColumnBuilder.newColumn('nomeCliente').withTitle('Acões')
	    		.notSortable()
        		.renderWith(visualizarHtml),
        	DTColumnBuilder.newColumn('nomeCliente').withTitle('Cliente'),
        	DTColumnBuilder.newColumn(null).withTitle('Celular')
        		.renderWith(celularHtml)
        		.notSortable(),
        	//DTColumnBuilder.newColumn('celular').withTitle('Celular'),
        	DTColumnBuilder.newColumn('tipoServico').withTitle('Serviço'),
        	DTColumnBuilder.newColumn('valorRecebido').withTitle('Vlr Recebido')
        		.renderWith(function(money, type, full) {
    				return $filter('currency')(money, '');
  				}),,        	
        	DTColumnBuilder.newColumn('dataHoraSaida').withTitle('Data Saida')
        		.renderWith(function(data, type, full) {
    				return $filter('date')(data, 'dd/MM/yyyy HH:mm');
  				}),
  			DTColumnBuilder.newColumn(null).withTitle('Situação')
        		.renderWith(situacaoHtml)
        		.notSortable(),
        	DTColumnBuilder.newColumn(null).withTitle('Tipo Pgto')
        		.renderWith(statusHtml)
        		.notSortable()
    	];

		$scope.urlBase = '/#!/servicos';

		// Context
		$scope.authentication = Authentication;		

		ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'Servicos', 'servicoId'];
          function ModalInstanceCtrl($scope, $modalInstance, Servicos, servicoId) {

          	// Find existing item
			$scope.servico = Servicos.servico.get({ 
				servicoId: servicoId
			});

            $scope.cancel = function () {
				$modalInstance.dismiss('cancel');
            };			
      	}

      	$scope.openDe = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();

	    	$scope.openedDe = true;
		};

		$scope.openAte = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();

	    	$scope.openedAte = true;
		};
		
		$scope.pesquisar = function() {
			$('#servicos-grid').DataTable().ajax.reload();
		};

		$scope.whatsapp = function(celular) {

			var celularWhatsapp = celular.replace(/\D/g, '');
			var url = "https://api.whatsapp.com/send?phone=55" + celularWhatsapp + "&text=Box45 Promoções";
			$window.open(url, '_blank');
		};

		$scope.visualizar = function(id) {
			var modalInstance = $modal.open({
            	templateUrl: 'modalVisualizar.html',
            	controller: ModalInstanceCtrl,
            	resolve: {
         			servicoId: function () {
           				return id;
         			}
       			},
            	size: 'lg'
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
            	state.text('Modal dismissed with OK status');
            }, function () {
            	state.text('Modal dismissed with Cancel status');
            });
		};
	}
]);