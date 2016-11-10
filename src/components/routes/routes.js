; (function () {
    angular.module('app')
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