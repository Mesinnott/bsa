import angular from 'angular'
import './stylesheets/viewcamp.scss'
import template from './templates/viewcamp.html'
const Component = 'viewcamp';

angular.module(`app.components.${Component}`, [])

    .service('viewcampService', function($http) {

    })

    .controller('viewcampController', function(viewcampService, $http) {

    })

    .component('viewcamp',{
        controller: 'viewcampController',
        template: template
    });

exports[Component] = Component;
