import angular from 'angular'
import './director.scss'
import template from './director.html'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .service('directorService', function ($http, $state) {
        var ds = this;
        debugger;
        ds.populateCamps = function (userId, cb) { // Need to pass in their own id. How?
            $http({
                method: 'GET',
                url: '/api/camps/' + userId
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

        ds.getYearId = (year, cb) => {
            let currentYear = year
            console.log('current year = ' + currentYear)
            $http.get(`/api/years?year=${currentYear}`)
                .then(function (res) {
                    cb(res.data)
                })
        }

        ds.getDirector = function (userId, cb) {
            $http({
                method: 'GET',
                url: '/api/users/' + userId
            }).then(function (res) {
                ds.director = res.data;
                return cb(ds.director);
            })
        }
    })

    .controller('directorController', function (directorService, sessionService, $http, $state) {
        let $ctrl = this;
        var dc = this;
        dc.directNum = $state.params.userId || '';




        this.goToCamp = function (campId) {
            directorService.goToCamp(campId)
        }

        this.getDirector = function (userId) {
            directorService.getDirector(userId, function (dirObj) {
                dc.dirObj = dirObj
            })
        }
        this.getDirector(dc.directNum)

        this.getCamps = function (userId) {
            directorService.populateCamps(userId, function (list) {
                dc.campList = list;
                console.log(dc.campList)
            })
        }
        this.getCamps(dc.directNum);




    })

    .component('director', {
        controller: 'directorController',
        template: template
    });

exports.component = Component;