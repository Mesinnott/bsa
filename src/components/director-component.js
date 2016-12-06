import angular from 'angular'
import './stylesheets/director.scss'
import template from './templates/director.html'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .service('directorService', function ($http, $state) {
        var ds = this;
        debugger;
        ds.populateCamps = function (directorId, cb) { // Need to pass in their own id. How?
            $http({
                method: 'GET',
                url: '/api/camps/' + directorId
            }).then(function (res) {
                // debugger;
                ds.campList = res.data;
                ds.campList = ds.campList.sort(function (a, b) {
                    return a.date - b.date;
                })
                return cb(ds.campList);
            })
        }

        ds.goToCamp = function (id) {
            debugger
            $state.go("viewcamp", { campId: id });
        }
    })

    .controller('directorController', function (directorService, $http) {
        let $ctrl = this;
        var dc = this;
        this.goToCamp = function (campId) {
            directorService.goToCamp(campId)
        }
        this.getCamps = function (directorId) {
            directorService.populateCamps(directorId, function(list) {
                dc.campList = list;
            }) // How to pass in directorId?
        }
        // debugger;
        this.getCamps("4ad02250-3304-49a2-a2b5-3762432272c3"); // Invoking above function // Hard coded
    })

    .component('director', {
        controller: 'directorController',
        template: template
    });

exports[Component] = Component;