import angular from 'angular'
import './stylesheets/director.scss'
import template from './templates/director.html'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .service('directorService', function($http) {
        var ds = this;
        ds.populateCamps = function(directorId) { // Need to pass in their own id. How?
            $http.get('/api/camps/' + directorId)
                .then(function(res) {
                    ds.campList = res.data;
                    ds.campList = ds.campList.sort(function(a,b) {
                        return a.date - b.date;
                    })
                })
            return ds.campList;
        }

        ds.goToCamp = function(id) {
            $state.href("viewcamp", {campId: id});
        }
    })

    .controller('directorController', function(directorService, $http) {
        let $ctrl = this;
        this.goToCamp = function(campId) {
            ds.goToCamp(campId)
        }
        this.getCamps = function(directorId) {
            this.camplist = ds.populateCamps(directorId) // How to pass in directorId?
        }
        this.getCamps(directorId); // Invoking above function
    })

    .component('director',{
        controller: 'directorController',
        template:template
    });

exports[Component] = Component;