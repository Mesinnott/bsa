; (function () {
    angular.module('bsa')
        .config(function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/'); // we may want to change this

            $stateProvider
                .state({
                    name: 'homepage',
                    url: '/',
                    component: 'homepage'
                })
        })
} ())