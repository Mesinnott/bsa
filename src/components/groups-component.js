import angular from 'angular'
import './stylesheets/groups.scss'
import template from './templates/groups.html'
import './group-builder'
const Component = 'groups';

angular.module(`app.components.${Component}`, [])
    .service('groupService', function($http) {

    })

    .controller('GroupController', function(groupService, $http) {
        let $ctrl = this;

    })

    .component('groups', {
        controller: GroupController,
        template: template
    });

exports[Component] = Component;