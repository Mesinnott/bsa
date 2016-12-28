import angular from 'angular'
import './stylesheets/adminAdd.scss'
import template from './templates/adminAdd.html'
const Component = 'adminadd';

angular.module(`app.components.${Component}`, [])

    .service('addService', function ($http, $state) {
        var ad = this;
        debugger;

        ad.add = (resource, obj) => {
            $http.post('/api/' + resource, obj)
            // .then(function(res){
            //     resolve(res)
            // }).catch(function(error){
            //     reject(error)
            // })
        }

        ad.getByAnyProp = (resource, param, value, cb) => {
            $http.get('/api/' + resource + "?" + param + "=" + value)
                .then(function (res) {
                    cb(res.data)
                    // ad.reservation = res.data
                    // console.log(ad.reservation)
                })
            // return ad.reservation
        }
        ad.getYearId = (year, cb) => {
            let currentYear = year
            console.log('current year = ' + currentYear)
            $http.get(`/api/years?year=${currentYear}`)
                .then(function (res) {
                    cb(res.data)
                })
        }



    })

    .controller('addController', function (addService, sessionService, $http, $state) {
        let $ctrl = this;
        var ac = this;

        ac.userId = ''

        ac.object = ''
        ac.num = ''
        ac.location = ''
        ac.date = ''
        ac.levels = ''
        ac.start = ''
        ac.locName = ''
        ac.end = ''
        ac.endTime = ''
        ac.max = ''
        ac.yearId = ''
        ac.year = ''
        ac.auth = ''
        ac.message = false
        ac.error = false
        ac.userName = ''

        // sessionService.getUserId(function(res){
        //     ac.userId=res
        //     console.log("got users Id "+ ac.userId)
        // })
        sessionService.checkAuth(function (res) {
            ac.auth = res
            console.log("current Auth = " + ac.auth)
        })



        ac.addSomething = function (resource, obj, name, year, num, location, locName, date, end, levels, start, endTime, max) {
            console.log('hello ' + resource + ' ' + obj)
            if (ac.auth == 'admin' || ac.auth == 'super') {
                if (resource == 'years') {
                    obj = { "year": obj }
                    addService.add(resource, obj)
                    ac.message="You have succefully added a new year"
                    ac.object = ''
                }
                if (resource == 'camps') {

                    addService.getByAnyProp('users', 'displayName', name, function (res) {
                        if (res.length > 0) {

                            ac.userId = res[0].id
                            addService.getYearId(year, function (res) {
                                ac.yearId = res[0].id

                                obj = {
                                    "camp": {

                                        "campNum": num,
                                        "location": location,
                                        "locationName": locName,
                                        "yearId": ac.yearId,
                                        "userId": ac.userId,
                                        "date": date,
                                        "endDate": end,
                                        "scoutLevels": levels,
                                        "startTime": start,
                                        "endTime": endTime,
                                        "maxScouts": max
                                    }

                                }
                                addService.add(resource, obj)
                                ac.message = 'You have successfully added a new camp'
                            })
                        }else{ac.error = 'That user cannot be found, you may have a spelling or capitalization error.'}
                    })
                }
            } else {
                ac.error = 'You are not authorized to add that'
            }
        }
        ac.messageClear = function () {
            ac.message = false
        }
        ac.errorClear = function () {
            ac.error = false
        }


    })

    .component('adminadd', {
        controller: 'addController',
        template: template
    });

exports[Component] = Component;