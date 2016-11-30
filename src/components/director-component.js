import angular from 'angular'
import './stylesheets/director.scss'
import template from './templates/director.html'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .service('directorService', function() {
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

        ds.pullCampInfo = function(campId) {
            $http.get('/api/camps/' + campId)
                .then(function(res) {
                    ds.currentCamp = res.data;
                    return ds.currentCamp;
                })
        }
    })

    .controller('directorController', function(directorService) {
        let $ctrl = this;
        $ctrl.camp = ds.pullCampInfo(campId)
        $ctrl.campList = ds.populateCamps(directorId) // How to pass in directorId?
    })

    .component('director',{
        controller: 'directorController',
        template:template
    });

exports[Component] = Component;