'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'unimarketingApp';

	var applicationModuleVendorDependencies = ['ngRoute',
												 'ngAnimate',
												 'ngStorage',
												 'ngTouch',
												 'ngCookies',
												 'pascalprecht.translate',
												 'ui.bootstrap',
												 'ui.router',
												 'oc.lazyLoad',
												 'cfp.loadingBar',
												 'ngSanitize',
												 'ngResource',
												 'ui.utils'
												];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.colors');

})();
(function() {
    'use strict';

    // Use Applicaion configuration module to register a new module
    ApplicationConfiguration.registerModule('app.core',[
          'app.routes',
          'app.sidebar',
          'app.navsearch',
          'app.preloader',
          'app.loadingbar',
          'app.translate',
          'app.settings',
          //'app.pages',
          'app.utils'
        ]);

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.lazyload');
})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.loadingbar');
})();
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('movimentacoes');
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.navsearch');
})();
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('page');

(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.preloader');

})();


(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.routes',['app.lazyload']);

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.settings');

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.sidebar');

})();
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.translate');

})();
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('usuarios-mobile');
(function() {
    'use strict';

    ApplicationConfiguration.registerModule('app.utils', [
          'app.colors'
          ]);

})();

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('veiculos');
(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide){
      
      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){
      // Add default menu entry
      Menus.addMenuItem('sidebar', 'Inicio', 'home', null, '/home', true, null, null, 'icon-home');
    }

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .config(appRoutes)
        ;
    appRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function appRoutes($stateProvider, $locationProvider, $urlRouterProvider, helper){

      // Set the following to true to enable the HTML5 Mode
      // You may have to set <base> tag in index and a routing configuration in your server
      $locationProvider.html5Mode(false);

      // default route
      $urlRouterProvider.otherwise('/page/signin');
      //$urlRouterProvider.otherwise('/home');

      // 
      // Application Routes
      // -----------------------------------   
      $stateProvider
        .state('app', {
          // url: '/',
          abstract: true,
          templateUrl: 'modules/core/views/core.client.view.html',
          resolve: helper.resolveFor('modernizr', 'icons', 'oitozero.ngSweetAlert', 'toaster', 'btford.socket-io')
        })
        .state('app.home', {
          url: '/home',
          controller: 'HomeController',
          templateUrl: 'modules/core/views/home.client.view.html'
        })
        // .state('page.signin', {
        //   url: '/signin',
        //   templateUrl: 'modules/users/views/authentication/signin.client.view.html',
        //   resolve: helper.resolveFor('modernizr', 'icons')
        // })
        // 
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // ----------------------------------- 
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    }
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


'use strict';

angular.module('app.core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'toaster', 'mySocket',
	function($scope, Authentication, Menus, toaster, mySocket) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');		

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		if (_.isObject($scope.authentication.user)) {
			mySocket.on('create-usuario', function(data) {
	        	toaster.pop(data.type, data.title, data.message);
	    	});
		}
	}
]);
'use strict';

angular.module('app.core').controller('HomeController', ['$scope', '$q', 'Authentication', 
	'Veiculos', 'Pagamentos', 'Depositos','Servicos', 'UsuariosSistema',
	function($scope, $q, Authentication, Veiculos, Pagamentos, Depositos, Servicos, UsuariosSistema) {
		
			

		/*		
		Veiculos.quantidade.get().$promise.then(function(data) {
			$scope.veiculos = data;
		});	

		var defer = $q.defer();
		Pagamentos.quantidade.get().$promise.then(function(data) {
			debugger;
			$scope.qtdePagamentos = data.data;
			//$scope.qtdePagamentos = 2;

			defer.resolve(data.data);
		});
		
		Pagamentos.quantidade.get().$promise.then(function(data) {
			$scope.qtdePagamentosTeste = data.length;
			$scope.qtdePagamentosTesteTeste = data.length;
		});

		*/
		
		Veiculos.veiculos.query().$promise.then(function(data) {
			$scope.qtdeVeiculos = data.length;
		});	

		UsuariosSistema.query().$promise.then(function(data) {
			$scope.qtdeUsuarios = data.length;
		});

		Pagamentos.pagamentos.query().$promise.then(function(data) {
			$scope.qtdePagamentos = data.length;
		});

		Depositos.depositos.query().$promise.then(function(data) {
			$scope.qtdeDepositos = data.length;
		});

		Servicos.servicos.query().$promise.then(function(data) {
			$scope.qtdeServicos = data.length;
		});

	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('app.core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position,
																iconClass, translateKey, alert) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender,
				iconClass: iconClass || 'fa fa-file-o',
				translate: translateKey,
				alert: alert
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		//Adding the sidebar menu
		this.addMenu('sidebar');
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('app.core').factory('mySocket', ["socketFactory", function(socketFactory) {
    return socketFactory();
}]);
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['/lib/modernizr/modernizr.js'],
            'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                                   '/lib/simple-line-icons/css/simple-line-icons.css']                               
          },
          // Angular based script (use the right module name)
          modules: [          
            {name: 'btford.socket-io',          files: ['/lib/socket-io-client/socket.io.js',
                                                        '/lib/angular-socket-io/socket.min.js']},
            {name: 'toaster',                   files: ['/lib/angularjs-toaster/toaster.js',
                                                        '/lib/angularjs-toaster/toaster.css']},
            {name: 'datatables',                files: ['/lib/datatables/media/css/jquery.dataTables.css',
                                                        '/lib/datatables/media/js/jquery.dataTables.js',                                                        
                                                        '/lib/angular-datatables/dist/angular-datatables.js',
                                                        '/lib/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js'
                                                        //'/lib/datatables-tabletools/js/dataTables.tableTools.js',
                                                        //'/lib/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.min.js',
                                                        //'/vendor/angular-datatables.inlineediting.js'
                                                        ], serie: true},
            {name: 'xeditable',                 files: ['/lib/angular-xeditable/dist/js/xeditable.js',
                                                        '/lib/angular-xeditable/dist/css/xeditable.css']},
            {name: 'oitozero.ngSweetAlert',     files: ['/lib/sweetalert/dist/sweetalert.css',
                                                        '/lib/sweetalert/dist/sweetalert.min.js',
                                                        '/lib/angular-sweetalert/SweetAlert.js']},
            {name: 'moment',                    files: ['/lib/moment/moment.js']},                                                        
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
'use strict';

// Configuring the Articles module
angular.module('movimentacoes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Movimentações', 'pesquisa-servicos', 'dropdown', '/pesquisa-servicos(/.*)?', false, null, 20, 'icon-lock');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Serviços', 'pesquisa-servicos');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Pagamentos', 'pesquisa-pagamentos');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Lançamentos', 'pesquisa-depositos');
		Menus.addSubMenuItem('sidebar', 'pesquisa-servicos', 'Relatórios', 'relatorios');
	}
]);
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
		}).

		state('app.relatorios', {
			url: '/relatorios',
			title: 'Relatórios',
			templateUrl: 'modules/movimentacoes/views/relatorios.client.view.html',
			resolve: helper.resolveFor('moment')
		});
	}
]);
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
		$scope.pagamentosRelatorios = {};
		$scope.lancamentosRelatorios = {};
		$scope.resumoFechamento = {};
		$scope.contatos = {};

		$scope.relatorioAtivo = {};
		$scope.pesquisa.mes = new Date();

		// Context
		$scope.authentication = Authentication;		

		//$scope.relatorioPagamento = Relatorios.pagamentos.query();

		$scope.openMes = function($event) {
	    	$event.preventDefault();
	    	$event.stopPropagation();

	    	$scope.openedMes = true;
		};

		//region Servicos

		$scope.agruparPorDataTipoPagamento = function() {
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
		}

		$scope.totais = function() {
			$scope.totalServicosRelatorios = [];

			var agrupadosTipoPagamento = _.groupBy($scope.relatorios, function(b) { 
				return b.tipoPagamento;
			});

			_.forEach(agrupadosTipoPagamento, function(value, key) {
			  var totalPorTipoPagamento = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valorRecebido);
				}, 0);

			  $scope.totalServicosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipoPagamento
			  	}
			  );
			});

			var totalGeral = _.reduce($scope.relatorios, function(sum, n) {
				return sum + parseFloat(n.valorRecebido);
			}, 0);

			$scope.totalServicosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioServico = function() {
			$scope.relatorioAtivo = 'servico';
			var _this = this;
			Relatorios.servicos.query({data: $scope.pesquisa.mes}, function success(data){
				debugger
				$scope.relatorios = _.where(data, { situacao: 'Pago'});
				_this.agruparPorDataTipoPagamento();
				_this.totais();
				}, function error(error){
			});
		};	

		//endregion Servicos

		//region Pagamentos

		$scope.agruparPorDataTipoPagamentoPagamento = function(data) {
			var listaDataFormatada = _.map(data, function(item) {
				var unixDate = parseInt(item.dataPagamento);
    			var dataEntrada = moment(unixDate).format('DD/MM');
				item.dataPagamento = dataEntrada;

				return item;
			});

			var agrupados = _.groupBy(listaDataFormatada, function(b) { 
				return b.dataPagamento;
			});

			_.forEach(agrupados, function(value, key) {
			  agrupados[key] = _.groupBy(agrupados[key], function(item) {
			    return item.tipoPagamento;
			  });
			});
		
			$scope.pagamentosRelatorios = agrupados;	
		}

		$scope.totaisPagamentos = function(data) {
			$scope.totalPagamentosRelatorios = [];

			var agrupadosTipoPagamento = _.groupBy(data, function(b) { 
				return b.tipoPagamento;
			});

			_.forEach(agrupadosTipoPagamento, function(value, key) {
			  var totalPorTipoPagamento = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valor);
				}, 0);

			  $scope.totalPagamentosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipoPagamento
			  	}
			  );
			});

			var totalGeral = _.reduce(data, function(sum, n) {
				return sum + parseFloat(n.valor);
			}, 0);

			$scope.totalPagamentosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioPagamento = function() {
			$scope.relatorioAtivo = 'pagamento';
			var _this = this;
			Relatorios.pagamentos.query({data: $scope.pesquisa.mes}, function success(data){
				_this.agruparPorDataTipoPagamentoPagamento(data);
				_this.totaisPagamentos(data);
				}, function error(error){
			});
		};	

		//endregion Pagamentos

		//region Lancamentos

		$scope.agruparPorDataTipoLancamento = function(data) {
			var listaDataFormatada = _.map(data, function(item) {
				var unixDate = parseInt(item.dataDeposito);
    			var dataEntrada = moment(unixDate).format('DD/MM');
				item.dataDeposito = dataEntrada;

				return item;
			});

			var agrupados = _.groupBy(listaDataFormatada, function(b) { 
				return b.dataDeposito;
			});

			_.forEach(agrupados, function(value, key) {
			  agrupados[key] = _.groupBy(agrupados[key], function(item) {
			    return item.tipoLancamento;
			  });
			});
		
			$scope.lancamentosRelatorios = agrupados;	
		}

		$scope.totaisLancamentos = function(data) {
			$scope.totalLancamentosRelatorios = [];

			var agrupadosTipoLancamento = _.groupBy(data, function(b) { 
				return b.tipoLancamento;
			});

			_.forEach(agrupadosTipoLancamento, function(value, key) {
			  var totalPorTipo = _.reduce(value, function(sum, n) {
		  			return sum + parseFloat(n.valor);
				}, 0);

			  $scope.totalLancamentosRelatorios.push(
			  	{
			  		tipo: key,
			  		valorTotal: totalPorTipo
			  	}
			  );
			});

			var totalGeral = _.reduce(data, function(sum, n) {
				return sum + parseFloat(n.valor);
			}, 0);

			$scope.totalLancamentosRelatorios.push(
				{
					tipo: "Geral",
					valorTotal: totalGeral
				}
			);
		};

		$scope.gerarRelatorioLancamento = function() {
			$scope.relatorioAtivo = 'lancamento';
			var _this = this;
			Relatorios.lancamentos.query({data: $scope.pesquisa.mes}, function success(data){
				_this.agruparPorDataTipoLancamento(data);
				_this.totaisLancamentos(data);
				}, function error(error){
			});
		};	

		//endregion Lancamentos

		//region Fechamento

		$scope.realizarFechamento = function(servicos, pagamentos, lancamentos) {
			var totalServico = _.findWhere(servicos, { tipo: 'Geral'});
			var totalPagamento = _.findWhere(pagamentos, { tipo: 'Geral'});
			var totalLancamento = _.findWhere(lancamentos, { tipo: 'Geral'});

			var lucro = (totalServico.valorTotal - totalPagamento.valorTotal);

			var valorDivergente = lucro - totalLancamento.valorTotal;
			var periodo = moment($scope.pesquisa.mes).format('MM/YYYY');

			$scope.resumoFechamento = {
				periodo: periodo,
				servico: totalServico.valorTotal,
				pagamento: totalPagamento.valorTotal,
				lancamento: totalLancamento.valorTotal,
				lucro: lucro,
				lucroBateu: (lucro == totalLancamento.valorTotal),
				diferenca: valorDivergente
			};
		};

		$scope.gerarRelatorioFechamento = function() {
			$scope.relatorioAtivo = 'fechamento';
			var _this = this;

			Relatorios.servicos.query({data: $scope.pesquisa.mes}, function success(data1){
					$scope.relatorios = _.where(data1, { situacao: 'Pago'});
					_this.totais();
					Relatorios.pagamentos.query({data: $scope.pesquisa.mes}, function success(data2){
							_this.totaisPagamentos(data2);
							Relatorios.lancamentos.query({data: $scope.pesquisa.mes}, function success(data3){
								_this.totaisLancamentos(data3);

								_this.realizarFechamento($scope.totalServicosRelatorios, 
									$scope.totalPagamentosRelatorios, 
									$scope.totalLancamentosRelatorios);

								}, function error(error){
							});
						}, function error(error){
					});					
				}, function error(error){
			});			
		};	

		//endregion Fechamento

		//#region Contatos
		$scope.gerarRelatorioContatos = function() {
			$scope.relatorioAtivo = 'contatos';
			var _this = this;

			Relatorios.todosServicos.query({}, function success(data){
					$scope.contatos = 
					{ 
						quantidade: _.size(data),
						contatos: [],
						contatosUnicos: _.uniq(_.pluck(data, 'celular'))
					};

					_.each(data, function(value, name){
						$scope.contatos.contatos.push({
					        cliente: value.nomeCliente,
					        celular: value.celular
					    });
					});
					
				}, function error(error){
			});			
		};	
		//endregion Contatos
	}
]);
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
  			DTColumnBuilder.newColumn(null).withTitle('Tipo Lançamento')
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
'use strict';

angular.module('movimentacoes')	
    .controller('PagamentosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Pagamentos', 
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
		Pagamentos, 
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

		//enum: ['CONTA', 'MATERIAL', 'FUNCIONARIO', 'EQUIPAMENTO', 'OUTROS'],
		var tipoPagamentoHtml = function(data, type, full, meta) {
			switch(data.tipoPagamento) {
			    case 'CONTA':
			        return '<div class="label label-warning">Conta</div>';
			    case 'MATERIAL':
			        return '<div class="label label-info">Material</div>';
			    case 'FUNCIONARIO':
			        return '<div class="label label-warning">Funcionário</div>';
			    case 'EQUIPAMENTO':
			        return '<div class="label label-success">Equipamento</div>';
			    case 'OUTROS':
			        return '<div class="label label-warning">Outros</div>';
			    default:
			        return '<div class="label label-danger">NONE</div>';
			}			
		}

		this.dtOptions = DTOptionsBuilder
			.newOptions()			
	    	.withOption('ajax', {
	    		dataSrc: 'data',
	        	url: '/api/pesquisa/pagamentos',
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
        	DTColumnBuilder.newColumn('valor').withTitle('Valor Pago'),
        	DTColumnBuilder.newColumn('tipoPagamento').withTitle('Tipo de Pagamento'),
        	DTColumnBuilder.newColumn('dataPagamento').withTitle('Data Pagamento')
        		.renderWith(function(data, type, full) {
    				return $filter('date')(data, 'dd/MM/yyyy');
  				}),
  			DTColumnBuilder.newColumn(null).withTitle('Tipo Pgto')
        		.renderWith(tipoPagamentoHtml),
  			DTColumnBuilder.newColumn(null).withTitle('Status')
        		.renderWith(statusHtml)
  			];

		$scope.urlBase = '/#!/pagamentos';

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
			$('#pagamentos-grid').DataTable().ajax.reload();
		};	
	}
]);
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
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('movimentacoes').factory('Servicos', ['$resource',
	function($resource) {

		var Quantidade = $resource('api/pesquisa/servicos');

		var Servicos = $resource('api/servicos/:servicoId', 
			{ servicoId: '@_id' });

		var Servico = $resource('api/servico/:servicoId', 
			{ servicoId: '@_id' }, 
			{ update: { method: 'PUT' } });
    	
    	return {
    		servicos: Servicos,
    		servico: Servico,
    		quantidade: Quantidade
    	};
	}
]).factory('Depositos', ['$resource',
	function($resource) {

		var Quantidade = $resource('api/pesquisa/depositos');

		var Depositos = $resource('api/depositos/:depositoId', 
			{ depositoId: '@_id' });

		var Deposito = $resource('api/deposito/:depositoId', 
			{ depositoId: '@_id' }, 
			{ update: { method: 'PUT' } });
    	
    	return {
    		depositos: Depositos,
    		deposito: Deposito,
    		quantidade: Quantidade
    	};
	}
]).factory('Pagamentos', ['$resource',
	function($resource) {

		var Quantidade = $resource('api/pesquisa/pagamentos');

		var Pagamentos = $resource('api/pagamentos/:pagamentoId', 
			{ pagamentoId: '@_id' });

		var Pagamento = $resource('api/pagamento/:pagamentoId', 
			{ pagamentoId: '@_id' }, 
			{ update: { method: 'PUT' } });
    	
    	return {
    		pagamentos: Pagamentos,
    		pagamento: Pagamento,
    		quantidade: Quantidade
    	};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('movimentacoes').factory('Relatorios', ['$resource',
	function($resource) {

		var TodosServicos = $resource('api/relatorios/todosServicos');
		var Servicos = $resource('api/relatorios/servicos');
		var Pagamentos = $resource('api/relatorios/pagamentos');
		var Lancamentos = $resource('api/relatorios/lancamentos');
		var Fechamento = $resource('api/relatorios/fechamento');
			
    	return {
    		todosServicos: TodosServicos,
    		servicos: Servicos,
    		pagamentos: Pagamentos,
    		lancamentos: Lancamentos,
    		fechamento: Fechamento
    	};
	}
]);
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

'use strict';

// Setting up route
angular.module('page').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider.
    state('page', {
      url: '/page',
      templateUrl: 'modules/page/views/page.client.view.html'
    });
  }
]);

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>',
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // ----------------------------------- 
      $rootScope.app = {
        name: 'ArquitetaWeb',
        description: 'Lava Jato - Sistema para Lava Jato',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      //$rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils', 'Authentication'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils, Authentication) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          $scope.authentication = Authentication;

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menu = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope'];
    function UserBlockController($rootScope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;
          
          $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;
            
          });
        }
    }
})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['Menus'];
    function SidebarLoader(Menus) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          onError = onError || function() { alert('Failure loading menu'); };
          
          var menu = Menus.getMenu('sidebar');

          if( menu )
            onReady( menu );
          else
            onError();

        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){
  
      $translateProvider.useStaticFilesLoader({
          prefix : '/i18n/',
          suffix : '.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
'use strict';


// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Sistema', 'configuracoes-sistema', 'dropdown', '/configuracoes-sistema(/.*)?', false, null, 20, 'icon-lock');
		Menus.addSubMenuItem('sidebar', 'configuracoes-sistema', 'Configurações', 'configuracoes-sistema');
		Menus.addSubMenuItem('sidebar', 'configuracoes-sistema', 'Usuários', 'usuarios-sistema');		
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// Users state routing
		$stateProvider.
		state('page.signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html',
			resolve: helper.resolveFor('modernizr', 'icons', 'oitozero.ngSweetAlert', 'toaster')
		}).
		state('page.signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('page.forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('page.reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('page.reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('page.reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('app.password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('app.profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('app.accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('app.listUsuariosSistema', {
			url: '/usuarios-sistema',
			title: 'Listar Usuários Sistema',
			templateUrl: 'modules/users/views/list-usuarios-sistema.client.view.html',
			resolve: helper.resolveFor('datatables')
		}).
		state('app.listConfiguracoes', {
			url: '/configuracoes-sistema',
			title: 'Configurações',
			templateUrl: 'modules/users/views/list-configuracoes-sistema.client.view.html',
			resolve: helper.resolveFor('datatables')
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/home');

		$scope.signup = function() {
			if($scope.registerForm.$valid) {
				$scope.credentials.username = $scope.credentials.email;
				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$location.path('/home');
				}).error(function(response) {
					$scope.error = response.message;
					console.log(response.message);
				});
			} else {
				$scope.registerForm.name.$dirty = true;
				$scope.registerForm.account_email.$dirty = true;
				$scope.registerForm.account_password.$dirty = true;
				$scope.registerForm.account_password_confirm.$dirty = true;
			}
		};

		$scope.signin = function() {
			if($scope.loginForm.$valid) {
				$http.post('/auth/signin', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$location.path('/home');
				}).error(function(response) {
					$scope.error = response.message;
					console.log(response.message);
					
				});
			} else {
				// set as dirty if the user click directly to login so we show the validation messages
				$scope.loginForm.account_email.$dirty = true;
				$scope.loginForm.account_password.$dirty = true;
			}
		};
	}
]);
'use strict';

angular.module('users').controller('ConfiguracoesController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'ConfiguracoesSistema', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $stateParams, $location, Authentication, ConfiguracoesSistema, DTOptionsBuilder, DTColumnDefBuilder) {
		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withLanguageSource('/server/pt-br.json')
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];	

		$scope.urlBase = '/#!/usuarios-sistema';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = ConfiguracoesSistema.query();

		$scope.deleteConfirm = function(index) {
			noty({
				modal: true,
		        text: 'Tem certeza que deseja deletar o registro?', 
		        buttons: [
		            { addClass: 'btn btn-primary', text: 'Sim', onClick: function($noty) {
		                    $noty.close();
		                    var caixa = $scope.caixas[index];

							if (caixa) {							
								caixa.$remove( function (response) {
									if (response) {
										$scope.caixas = _.without($scope.caixas, caixa);

										noty({
										    text: response.message,
										    type: response.type
										});
									}
								}, function(errorResponse) {
									$scope.error = errorResponse.data.message;
									noty({
									    text: errorResponse.data.message,
									    type: errorResponse.data.type
									});
								});
							}
		                }
		            },
		            { 
		                addClass: 'btn btn-warning', text: 'Não', onClick: function($noty) {
		                    $noty.close();
		                }
		            }
		        ]
		    }); 
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('UsuarioSistemaController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'UsuariosSistema', 'Users', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $stateParams, $location, Authentication, UsuariosSistema, Users, DTOptionsBuilder, DTColumnDefBuilder) {
		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withLanguageSource('/server/pt-br.json')
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];	

		$scope.urlBase = '/#!/usuarios-sistema';

		// Context
		$scope.authentication = Authentication;
		$scope.usuariosMobile = UsuariosSistema.query();

		$scope.alteraSituacao = function(index) {
	        var usuarioMobile = $scope.usuariosMobile[index];
	        var user = new Users(usuarioMobile);

			user.$update(function(response) {
				$scope.success = true;
			}, function(response) {
				$scope.error = response.data.message;
			});

		};

		$scope.deleteConfirm = function(index) {
			noty({
				modal: true,
		        text: 'Tem certeza que deseja deletar o registro?', 
		        buttons: [
		            { addClass: 'btn btn-primary', text: 'Sim', onClick: function($noty) {
		                    $noty.close();
		                    var caixa = $scope.caixas[index];

							if (caixa) {							
								caixa.$remove( function (response) {
									if (response) {
										$scope.caixas = _.without($scope.caixas, caixa);

										noty({
										    text: response.message,
										    type: response.type
										});
									}
								}, function(errorResponse) {
									$scope.error = errorResponse.data.message;
									noty({
									    text: errorResponse.data.message,
									    type: errorResponse.data.type
									});
								});
							}
		                }
		            },
		            { 
		                addClass: 'btn btn-warning', text: 'Não', onClick: function($noty) {
		                    $noty.close();
		                }
		            }
		        ]
		    }); 
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
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
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('UsuariosSistema', ['$resource',
	function($resource) {
		return $resource('api/usuarios-sistema/:usuarioSistemaId', {
			usuarioSistemaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('usuarios-mobile').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('sidebar', 'Leilões', 'usuarios-mobile', 'dropdown', '/usuarios-mobile(/.*)?', false, null, 20, 'icon-users');
		//Menus.addSubMenuItem('sidebar', 'usuarios-mobile', 'Listar leilões', 'usuarios-mobile');
	}
]);
'use strict';

// Setting up route
angular.module('usuarios-mobile').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// Articles state routing
		$stateProvider.
		state('app.listUsuariosMobile', {
			url: '/usuarios-mobile',
			title: 'Listar Usuários Mobile',
			templateUrl: 'modules/usuarios-mobile/views/list-usuarios-mobile.client.view.html',
			resolve: helper.resolveFor('datatables', 'xeditable')
		});
	}
]);
'use strict';

angular.module('usuarios-mobile').controller('UsuarioMobileController', [
	'$scope', 
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 'UsuariosMobile', 
	'DTOptionsBuilder', 
	'DTColumnDefBuilder', 
	'SweetAlert',
	'$modal',
	function($scope, 
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		UsuariosMobile, 
		DTOptionsBuilder, 
		DTColumnDefBuilder,
		SweetAlert,
		$modal) {		

		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withOption('processing', true)
	    .withLanguageSource('/server/pt-br.json')
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];			

		$scope.urlBase = '/#!/usuarios-mobile';

		// Context
		$scope.authentication = Authentication;
		$scope.leiloes = UsuariosMobile.leilao.query();

		ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
          function ModalInstanceCtrl($scope, $modalInstance) {

          	$scope.leilao = {};

          	$scope.open = function($event) {
		    	$event.preventDefault();
		    	$event.stopPropagation();

		    	$scope.opened = true;
			};
		
            $scope.ok = function (leilao) {
            	var model = new UsuariosMobile.leilao(leilao);

				// Redirect after save
				model.$save(function(response) {
					//console.log(response);
					$modalInstance.close('closed');
				}, function(errorResponse) {
					SweetAlert.swal('Erro!', errorResponse.data.message, errorResponse.data.type);
				});            	
            };

            $scope.cancel = function () {
				$modalInstance.dismiss('cancel');
            };

            $scope.preencherCampos = function(url) {
            	var leilaoPrenchido = UsuariosMobile.preencherDados.validar(url);
		    	$scope.leilao = leilaoPrenchido;
			};
          }

		$scope.addItem = function(item) {
			// var novoUsuario = {
			// 	name: null,
			// 	email: null
			// };
			// $scope.usuariosMobile.unshift(novoUsuario);				
			var modalInstance = $modal.open({
            	templateUrl: 'modalInserir.html',
            	controller: ModalInstanceCtrl,
            	size: 'md'
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
            	state.text('Modal dismissed with OK status');
            }, function () {
            	state.text('Modal dismissed with Cancel status');
            });
		};

		$scope.visualizar = function(item) {
			window.location = '/#!/veiculos/' + item._id;
		};		

		$scope.deleteConfirm = function(index) {			
			SweetAlert.swal({   
				title: 'Você tem certeza?',   
				text: 'Após deletado não vai ser mais possível acessar o registro!',   
				type: 'warning',   
				showCancelButton: true,   
				confirmButtonColor: '#DD6B55',   
				confirmButtonText: 'Sim',   
				cancelButtonText: 'Não',
				closeOnConfirm: false,   
				closeOnCancel: false 
			}, function(isConfirm){  
				if (isConfirm) {
					var usuarioMobile = $scope.leiloes[index];
					if (usuarioMobile) {							
						usuarioMobile.$remove( function (response) {
							if (response) {
								$scope.leiloes = _.without($scope.leiloes, usuarioMobile);

								SweetAlert.swal('Deletado!', 'O registro foi deletado.', 'success');
							}
						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
							SweetAlert.swal('Erro!', errorResponse.data.message, errorResponse.data.type);
						});
					}

				} else {     
					SweetAlert.swal('Cancelado', 'O registro não foi removido :)', 'error');   
				} 
            });
		};
	}
]);
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
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

'use strict';

// Configuring the Articles module
angular.module('veiculos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('sidebar', 'Veiculos', 'pesquisa-veiculos', 'dropdown', '/pesquisa-veiculos(/.*)?', false, null, 20, 'icon-basket-loaded');
	}
]);
'use strict';

// Setting up route
angular.module('veiculos').config(['$stateProvider', 'RouteHelpersProvider',
	function($stateProvider, helper) {
		// Articles state routing
		$stateProvider.
		state('app.listVeiculos', {
			url: '/veiculos/:leilaoId',
			title: 'Listar Veiculos',
			templateUrl: 'modules/veiculos/views/list-veiculos.client.view.html',
			resolve: helper.resolveFor('datatables')
		}).
		state('app.listTodosVeiculos', {
			url: '/pesquisa-veiculos',
			title: 'Listar Veiculos',
			templateUrl: 'modules/veiculos/views/todos-veiculos.client.view.html',
			resolve: helper.resolveFor('datatables', 'xeditable')
		});
	}
]);
'use strict';

angular.module('veiculos')	
    .controller('VeiculosController', [
	'$scope', 
	'$compile',
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Veiculos', 
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
		Veiculos, 
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
			switch(data.status) {
			    case 'VENDIDO':
			        return '<div class="label label-success">VENDIDO</div>';
			    case 'CONDICIONAL':
			        return '<div class="label label-info">CONDICIONAL</div>';
			    case 'BAIXA OFERTA':
			        return '<div class="label label-warning">BAIXA OFERTA</div>';
			    case 'SEM LICITANTES':
			        return '<div class="label label-warning">SEM LICITANTES</div>';
			    case 'RETIRADO':
			        return '<div class="label label-danger">RETIRADO</div>';
			    case 'ABERTO':
			        return '<div class="label label-danger">ABERTO</div>';
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

		var imagemHtml = function (data, type, full, meta) {
			return '<div class="media">'+
					'	<img src="'+full.imagens[0]+'" alt="Image" class="img-responsive img-circle">'+
					'</div>';
		}

		this.dtOptions = DTOptionsBuilder
			.newOptions()			
	    	.withOption('ajax', {
	    		dataSrc: 'data',
	        	url: '/api/pesquisa/veiculos',
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
	    	DTColumnBuilder.newColumn('nome').withTitle('#').notVisible(),
	    	DTColumnBuilder.newColumn('nome').withTitle('Acões')
	    		.notSortable()
        		.renderWith(visualizarHtml),
        	DTColumnBuilder.newColumn('nome').withTitle('Nome'),
        	DTColumnBuilder.newColumn('ano').withTitle('Ano'),
        	DTColumnBuilder.newColumn('cor').withTitle('Cor'),
        	DTColumnBuilder.newColumn('placa').withTitle('Placa'),
        	DTColumnBuilder.newColumn('valorVenda').withTitle('Valor Vendido'),
        	DTColumnBuilder.newColumn('status').withTitle('Status'),
        	DTColumnBuilder.newColumn('leilao.date').withTitle('Data')
        		.renderWith(function(data, type, full) {
    				return $filter('date')(data, 'dd/MM/yyyy');
  				}),
        	DTColumnBuilder.newColumn(null).withTitle('Status')
        		.renderWith(statusHtml)
    	];

		$scope.urlBase = '/#!/veiculos';

		// Context
		$scope.authentication = Authentication;		

		ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'Veiculos', 'veiculoId'];
          function ModalInstanceCtrl($scope, $modalInstance, Veiculos, veiculoId) {

          	// Find existing item
			$scope.veiculo = Veiculos.veiculo.get({ 
				veiculoId: veiculoId
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
			$('#veiculos-grid').DataTable().ajax.reload();
		};

		$scope.visualizar = function(id) {
			var modalInstance = $modal.open({
            	templateUrl: 'modalVisualizar.html',
            	controller: ModalInstanceCtrl,
            	resolve: {
         			veiculoId: function () {
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
'use strict';

angular.module('veiculos').controller('VeiculoController', [
	'$scope', 
	'$interval',
	'$stateParams', 
	'$location', 
	'Authentication', 
	'Veiculos', 
	'DTOptionsBuilder', 
	'DTColumnDefBuilder', 
	'SweetAlert',
	'$modal',
	function($scope, 
		$interval,
		$stateParams, 
		$location, 
		Authentication, 
		Veiculos, 
		DTOptionsBuilder, 
		DTColumnDefBuilder,
		SweetAlert,
		$modal) {		

		$scope.authentication = Authentication;

		this.dtOptions = DTOptionsBuilder
		.newOptions()
	    .withPaginationType('full_numbers')
	    .withOption('bLengthChange', false)
	    .withOption('bInfo', false)
	    .withLanguageSource('/server/pt-br.json')
	    .withBootstrap();
	
		this.dtColumnDefs = [
			DTColumnDefBuilder
				.newColumnDef(0)
				.withOption('bSearchable', false)
				.notVisible()
				.notSortable(),
	        DTColumnDefBuilder
	        	.newColumnDef(1)
	        	.notSortable()
		];	

		$scope.urlBase = '/#!/veiculos';

		// Context
		$scope.authentication = Authentication;
		
		$scope.veiculos = Veiculos.veiculos.query({
			leilaoId: $stateParams.leilaoId 
		});

		ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'Veiculos', 'veiculo'];
          function ModalInstanceCtrl($scope, $modalInstance, Veiculos, veiculo) {

          	// Find existing item
			$scope.veiculo = Veiculos.veiculo.get({ 
				veiculoId: veiculo._id
			});

            $scope.cancel = function () {
				$modalInstance.dismiss('cancel');
            };			
      	}
		
		$scope.visualizar = function(item) {
			var modalInstance = $modal.open({
            	templateUrl: 'modalVisualizar.html',
            	controller: ModalInstanceCtrl,
            	resolve: {
         			veiculo: function () {
           				return item;
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
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('veiculos').factory('Veiculos', ['$resource',
	function($resource) {

		var Quantidade = $resource('api/pesquisa/veiculos');

		var Veiculos = $resource('api/veiculos/:leilaoId', 
			{ leilaoId: '@_id' });

		var Veiculo = $resource('api/veiculo/:veiculoId', 
			{ veiculoId: '@_id' }, 
			{ update: { method: 'PUT' } });
    	
    	return {
    		veiculos: Veiculos,
    		veiculo: Veiculo,
    		quantidade: Quantidade
    	};
	}
]);