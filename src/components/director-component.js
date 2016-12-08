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

        ds.getDirector = function (directorId, cb) {
            $http({
                method: 'GET',
                url: '/api/directors/' + directorId
            }).then(function (res) {
                ds.director = res.data;
                return cb(ds.director);
            })
        }
    })

    .controller('directorController', function (directorService, $http, $state) {
        let $ctrl = this;
        var dc = this;
        dc.directNum = $state.params.directorId || '';
        
        this.goToCamp = function (campId) {
            directorService.goToCamp(campId)
        }
        this.getCamps = function (directorId) {
            directorService.populateCamps(directorId, function (list) {
                dc.campList = list;
            }) // How to pass in directorId?
        }
        this.getDirector = function(directorId){
            directorService.getDirector(directorId, function(dirObj){
                dc.dirObj = dirObj
            })
        }
        this.getDirector(dc.directNum)
        // debugger;
        this.getCamps(dc.directNum); // Invoking above function // Hard coded
    })

    .component('director', {
        controller: 'directorController',
        template: template
    });

exports[Component] = Component;