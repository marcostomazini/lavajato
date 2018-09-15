'use strict';

angular.module('movimentacoes')	
    .controller('DepositosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Depositos', 
	'DTOptionsBuilder', 
	'DTColumnBuilder', 
	'SweetAlert',
	'$modal',
	'$filter',
	function($scope, 
		$compile,
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		Depositos, 
		DTOptionsBuilder, 
		DTColumnBuilder,
		SweetAlert,
		$modal,
		$filter) {		

		$scope.authentication = Authentication;
		$scope.pesquisa = {};

		var createdRow = function(row, data, dataIndex) {
        	// Recompiling so we can bind Angular directive to the DT
        	$compile(angular.element(row).contents())($scope);
    	}

    	var statusHtml = function(data, type, full, meta) {
			if (data.excluido) {
		        return '<div class="label label-danger">excluido</div><br>';			    
			} else {
			    return '<div class="label label-success">ativo</div><br>';
			}
		}

		// enum: ['DINHEIRO', 'DEBITO', 'CREDITO', 'OUTROS'],
		var tipoLancamentoHtml = function(data, type, full, meta) {
			switch(data.tipoLancamento) {
			    case 'DINHEIRO':
			        return '<div class="label label-success">Dinheiro</div>';
			    case 'DEBITO':
			        return '<div class="label label-info">Debito</div>';
			    case 'CREDITO':
			        return '<div class="label label-warning">Crédito</div>';			    
			    case 'OUTROS':
			        return '<div class="label label-danger">Outros</div>';
			    default:
			        return '<div class="label label-danger">NONE</div>';
			}			
		}

		this.dtOptions = DTOptionsBuilder
			.newOptions()			
	    	.withOption('ajax', {
	    		dataSrc: 'data',
	        	url: '/api/pesquisa/depositos',
	        	type: 'POST'
	    	})
	    	.withOption('createdRow', createdRow)
	    	.withOption('bFilter', false)
	    	.withOption('processing', true)
	    	.withOption('serverSide', true)
	    	.withOption('fnServerParams', function (aoData) {
                aoData.searchCustom = [{
                    "name": "descricao",
                    "value": $scope.pesquisa.descricao || ''
                },{
                    "name": "valor",
                    "value": $scope.pesquisa.valor || ''
                },{
                    "name": "dataDeposito",
                    "value": $scope.pesquisa.dataDeposito || ''
                }];
            })
		    .withPaginationType('full_numbers')		    
		    .withLanguageSource('/server/pt-br.json');

	    this.dtColumns = [
        	DTColumnBuilder.newColumn('descricao').withTitle('Descrição'),
        	DTColumnBuilder.newColumn('valor').withTitle('Valor Lançamento'),
        	DTColumnBuilder.newColumn('dataDeposito').withTitle('Data do Lançamento')
        		.renderWith(function(data, type, full) {
    				return $filter('date')(data, 'dd/MM/yyyy');
  				}),
  			DTColumnBuilder.newColumn(null).withTitle('Tipo Pgto')
        		.renderWith(tipoLancamentoHtml),
			DTColumnBuilder.newColumn(null).withTitle('Status')
        		.renderWith(statusHtml)
  			];

		$scope.urlBase = '/#!/depositos';

		// Context
		$scope.authentication = Authentication;		

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
			$('#depositos-grid').DataTable().ajax.reload();
		};	
	}
]);