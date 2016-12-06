import angular from 'angular'
import template from './templates/admin.html'
import './stylesheets/admin.scss'

const Component = 'admin'



// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .service('adService', function ($http, $state) {
        var ad = this;
        ad.camps = [''];
        ad.scouts = [''];
        ad.reservation = [''];
        // var url1 = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
        ad.getCurrentYears = (cb) => {
            let currentYear = new Date().getFullYear()
            currentYear = 2016
            let nextYear = currentYear++
            $http.get(`/api/years?year=${currentYear}&year=${nextYear}`)
                .then(function (res) {
                    cb(res.data)
                })
        }
        ad.getCampsByYear = (yearId, cb) => {
            $http.get('/api/camps?yearId=' + yearId)
                .then(function (res) {
                    ad.camps = res.data
                    ad.camps = ad.camps.sort(function (a, b) {
                        return a.date - b.date
                    })
                    cb(ad.camps)
                    console.log(ad.camps)
                }).catch(a => console.log(a))
            return ad.camps
        }
        ad.scoutGetByAnyId = (reservationId, cb) => {
            $http.get('/api/scouts/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    ad.scouts = res.data
                    console.log(ad.scouts)
                })
            return ad.scouts
        }
        ad.reservationGetById = (reservationId, cb) => {
            $http.get('/api/reservations/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    ad.reservation = res.data
                    console.log(ad.reservation)
                })
            return ad.reservation
        }

        ad.editScout = (id, scout, resolve, reject) => {
            $http.put('/api/scouts/' + id, scout)
                .then(function (res) {
                    resolve(res)
                }).catch(function(error){
                    reject(error)
                })
        }


    })

    //   AdminController.$inject = [];


    //  function AdminController(){
    //         let ad = this;

    //         ad.reservations= function(){
    //         console.log('its working...')
    //         debugger
    //         ad.reservationGetByAnyId()

    //         }
    //     }


    .controller('adController', function (adService, $http) {
        let ad = this;
        ad.test = 'testing 123'
        ad.reservation = ['']

        this.getYears = function () {
            adService.getCurrentYears(
                function (years) {
                    ad.years = years
                    console.log(years)
                }
            )
        }

        this.getCamps = function () {

            adService.getCampsByYear(
                ad.yearId,
                camps => {
                    ad.camps = camps
                }
            )
        }

        ad.reservations = function (id) {
            debugger
            console.log('its working...')
            adService.reservationGetById(id, function (reserv) {
                ad.resDetails = reserv;
            })
            adService.scoutGetByAnyId(id, function (list) {
                ad.reservation = list;
            })
        }

        ad.save = function (id, scout) {
            scout = { "scout": scout }
            adService.editScout(id, scout, function (save) {
                console.log(save)

            })
        }

        ad.saveAll = function (list) {
            for (var i = 0; i < list.length; i++) {
                var scout = list[i]
                var id = scout.id
                console.log("id: " + id)
                ad.save(id, scout)
                console.log("updated " + (i + 1))
            }

        }
        ad.remove = function (id, scout, index) {
            debugger
            var reserve= scout.reservationId
            console.log(reserve)
            var scout = {
                "scout":
                {
                    "id": id,
                    "campId": null,
                    "reservationId": null
                }
            }
            adService.editScout(id, scout, function(res){
                console.log(res)
                ad.reservation.splice(index,1)
            }, function(res){
                console.error(res)
            })
        }


    })

    .component('admin', {
        controller: 'adController',
        controllerAs: 'ad',
        template: template
    })


//   .component(Component, { 
//     template: template,
//     controller: 'adController'
//   })

exports[Component] = Component

