import angular from 'angular'
import template from './templates/admin.html'
import './stylesheets/admin.scss'

const Component = 'admin'



// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .service('abService', function ($http, $state) {
        var ab = this;
        ab.camps = [''];
        ab.scouts = [''];
        ab.reservation = [''];
        ab.getCurrentYears = (cb) => {
            let currentYear = new Date().getFullYear()
            currentYear = 2016
            let nextYear = currentYear++

            $http.get(`/api/years?year=${currentYear}&year=${nextYear}`)
                .then(function (res) {
                    cb(res.data)
                })
        }
        ab.getCampsByYear = (yearId, cb) => {
            $http.get('/api/camps?yearId=' + yearId)
                .then(function (res) {
                    ab.camps = res.data
                    ab.camps = ab.camps.sort(function (a, b) {
                        return a.date - b.date
                    })
                    cb(ab.camps)
                    console.log(ab.camps)
                }).catch(a => console.log(a))
            return ab.camps
        }
        ab.getResByDen = (resource, param, value, cb) => {
            $http.get('/api/' + resource + "?" + param + "=" + value)
                .then(function (res) {
                    cb(res.data)
                    ab.reservation = res.data
                    console.log(ab.reservation)
                })
            return ab.reservation
        }



        ab.scoutGetByAnyId = (reservationId, cb) => {
            $http.get('/api/scouts/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    ab.scouts = res.data
                    console.log(ab.scouts)
                })
            return ab.scouts
        }

        ab.reservationGetById = (reservationId, cb) => {
            $http.get('/api/reservations/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    ab.reservation = res.data
                    console.log(ab.reservation)
                })
            return ab.reservation
        }

        ab.editScout = (id, scout, resolve, reject) => {
            $http.put('/api/scouts/' + id, scout)
                .then(function (res) {
                    resolve(res)
                }).catch(function (error) {
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


    .controller('adController', function (abService, $http) {
        let ad = this;
        ad.test = 'testing 123'
        ad.reservation = ['']
        ad.prop=''
        ad.resource='0'

        ad.resources=[
            {
                name: "camps",
                displayName: "Camps",
                props: [
                    {
                        name: "campNum",
                        displayName: "Camp Number"
                    },
                    {
                        name: "date",
                        displayName: "Date"
                    },
                    {
                        name: "location",
                        displayName: "Location"
                    },
                    {
                        name: "maxScouts",
                        displayName: "Max"
                    },
                    {
                        name: "scoutLevels",
                        displayName: "Scout Ages"
                    },
                ]
            },
            {
                name: "packs",
                displayName: "Packs",
                props: [
                    {
                        name: "number",
                        displayName: "Pack Number"
                    },
                    {
                        name: "zone",
                        displayName: "Pack Zone"
                    },

                ]
            },
            {
                name:"scouts",
                displayName: "Scouts",
                props:[
                    {
                        name: "denNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "reservationId",
                        displayName: "Reservation Id"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    }
                ]
            },
            {
                name:"leaders",
                displayName: "Leaders",
                props:[
                    {
                        name: "denNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "reservationId",
                        displayName: "Reservation Id"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    }
                ]

            },
            {
                name: "directors",
                displayName: "Camp Director",
                props: [
                    {
                        name: "email",
                        displayName: "Email"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    }

                ]
            },
            {
                name: "reservations",
                displayName: "Reservation",
                props:[
                    {
                        name: "campNum",
                        displayName: "Camp Number"
                    },
                    {
                        name: "denNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "email",
                        displayName: "Email Address"
                    },
                    {
                        name: "id",
                        displayName: "Reservation ID"
                    }
                ]
            },
            {
                name: "districts",
                displayName: "Districts",
                props:[
                    {
                        name: "name",
                        displayName: "Name"
                    }
                ]
            },
            {
                name: "users",
                displayName: "Users",
                props: [
                    {
                        name: "displayName",
                        displayName: "Name"
                    },
                    {
                        name: "email",
                        displayName: "Email"
                    }

                ]
            }
        ]






        this.getYears = function () {
            abService.getCurrentYears(
                function (years) {
                    ad.years = years
                    console.log(years)
                }
            )
        }

        this.getCamps = function () {

            abService.getCampsByYear(
                ad.yearId,
                camps => {
                    ad.camps = camps
                }
            )
        }

        ad.reservations = function (value) {
            debugger
            console.log('its working...')
            abService.getResByDen(ad.resource, ad.param, value, function (res) {
                ad.reservation = res
            })

            abService.reservationGetById(value, function (reserv) {
                ad.resDetails = reserv;
            })


            //     if (value.length < 5) {
            //         abService.getResByDen(ad.resource, ad.param, value, function(res){
            //             ad.reservation = res
            //         })
            //     }else{
            //     abService.reservationGetById(value, function (reserv) {
            //         ad.resDetails = reserv;
            //     })
            //     abService.scoutGetByAnyId(value, function (list) {
            //         ad.reservation = list;
            //     })
            // }

        }

        ad.save = function (id, scout) {
            scout = { "scout": scout }
            abService.editScout(id, scout, function (save) {
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
            var reserve = scout.reservationId
            console.log(reserve)
            var scout = {
                "scout":
                {
                    "id": id,
                    "campId": "removed",
                    "reservationId": "removed"
                }
            }
            abService.editScout(id, scout, function (res) {
                console.log(res)
                ad.reservation.splice(index, 1)
            }, function (res) {
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

