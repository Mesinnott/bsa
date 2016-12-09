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
        ab.getByAnyProp = (resource, param, value, cb) => {
            // console.log("args..." +resource+param+value)
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

        ab.editAny = (resource, id, body, resolve, reject) => {
            $http.put('/api/'+resource+'s/' + id, body)
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
        ad.error = false


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
                        name: "packNum",
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
                        name: "packNum",
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
                name:"chiefs",
                displayName: "Chiefs",
                props:[
                    {
                        name: "packNum",
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
            // {
            //     name: "directors",
            //     displayName: "Camp Director",
            //     props: [
            //         {
            //             name: "email",
            //             displayName: "Email"
            //         },
            //         {
            //             name: "name",
            //             displayName: "Name"
            //         }

            //     ]
            // },
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
        
        let templates = {
            healthForm: `<input type="checkbox" ng-change="ad.save(scout.id, scout)" class="form-control" ng-model="scout.healthForm">`,
            paid:`<input ng-change="ad.save(scout.id, scout)" type="checkbox" class="form-control" ng-model="scout.paid">`,
            super:`<input ng-change="ad.save(scout.id, scout)" type="checkbox" class="form-control" ng-model="scout.super">`,
            admin:`<input ng-change="ad.save(scout.id, scout)" type="checkbox" class="form-control" ng-model="scout.admin">`,
            director:`<input ng-change="ad.save(scout.id, scout)" type="checkbox" class="form-control" ng-model="scout.director">`,
            leader:`<input ng-change="ad.save(scout.id, scout)" type="checkbox" class="form-control" ng-model="scout.leader">`
        }
        ad.tableProps=[
            {
                name: "camps",
                displayName: "Camps",
                props: [
                    {
                        name: "campNum",
                        displayName: "Camp Number"
                    },
                    {
                        name: "scoutLevels",
                        displayName: "Scout Ages"
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
                        name:"date",
                        displayName:"Start Date"
                    },
                    {
                        name:"endDate",
                        displayName:"End Date"
                    },
                    {
                        name: "maxScouts",
                        displayName: "Max"
                    },
                    {
                        name:"confirmedReservations",
                        displayName: "Confirmed"
                    },
                    {
                        name:"pendingReservations",
                        displayName:"Pending"
                    },
                    {
                        name:"availability",
                        displayName:"Availability"
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
                        name: "packNum",
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
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                        template: templates.healthForm
                    },
                    {
                        name: "paid",
                        displayName:"Paid",
                        template: templates.paid
                    }
                ]
            },
            {
                name:"leaders",
                displayName: "Leaders",
                props:[
                    {
                        name: "packNum",
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
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                        template: templates.healthForm
                    },
                    {
                        name: "paid",
                        displayName:"Paid",
                        template: templates.paid
                    }
                ]

            },{
                name:"chiefs",
                displayName: "Chiefs",
                props:[
                    {
                        name: "packNum",
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
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                        template: templates.healthForm
                    },
                    {
                        name: "paid",
                        displayName:"Paid",
                        template: templates.paid
                    }
                ]

            },
            // {
            //     name: "directors",
            //     displayName: "Camp Director",
            //     props: [
            //         {
            //             name: "email",
            //             displayName: "Email"
            //         },
            //         {
            //             name: "name",
            //             displayName: "Name"
            //         }

            //     ]
            // },
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
                    },
                    {
                        name:"location",
                        displayName:"Camp Location"
                    },
                    {
                        name:"date",
                        displayName:"Camp Date",
                    },
                    {
                        name:"leader1",
                        displayName:"Leader 1"
                    },
                    {
                        name:"leader2",
                        displayName:"Leader 2"
                    },
                    {
                        name:"paidInFull",
                        displayName: "Paid In Full"
                    },
                    {
                        name:"active",
                        displayName:"Active"
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
                    },
                    {
                        name: "super",
                        displayName:"Super Admin Approved",
                        template:templates.super
                    },
                    {
                        name: "admin",
                        displayName:"Admin Approved",
                        template:templates.admin
                    },
                    {
                        name:"director",
                        displayName:"Camp Director",
                        template:templates.director
                    },
                    {
                        name:"reservation",
                        displayName:"Den Leader",
                        template:templates.leader
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
        ad.setResource=function(index){
            // console.log(ad.resources[index].name)
            return ad.resources[index].name


        }

        ad.reservations = function (value) {
            debugger
            console.log('its working...')
            abService.getByAnyProp(ad.setResource(ad.resource), ad.prop, value, function (res) {
                ad.reservation = res
            })

            // abService.reservationGetById(value, function (reserv) {
            //     ad.resDetails = reserv;
            // })

        }

        ad.save = function (id, resource, name) {
            name = name.split("")
            name.pop()
            name=name.join('')
            let body= {}
            body[name]=resource
            // resource = { name: resource }
            abService.editAny(name, id, body, function (save) {
                console.log(save)

            })
        }

        ad.saveAll = function (list) {
            ad.error="Your Changes Have been saved"



            // for (var i = 0; i < list.length; i++) {
            //     var scout = list[i]
            //     var id = scout.id
            //     console.log("id: " + id)
            //     ad.save(id, scout)
            //     console.log("updated " + (i + 1))
            // }

        }
        ad.reset= function(){
            ad.error=false
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

