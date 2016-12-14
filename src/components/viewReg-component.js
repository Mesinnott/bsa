import angular from 'angular'
import template from './templates/viewReg.html'
import './stylesheets/viewReg.scss'
const Component = 'viewreg';

angular.module(`app.components.${Component}`, [])


    .service('vrService', function ($http, $state) {
        var vs = this;
        vs.camps = [''];
        vs.scouts = [''];
        vs.leaders = [''];
        vs.getCurrentYears = (cb) => {
            let currentYear = new Date().getFullYear()
            currentYear = 2016
            let nextYear = currentYear++


            $http.get(`/api/years?year=${currentYear}&year=${nextYear}`)
                .then(function (res) {
                    cb(res.data)
                })
        }

        vs.add = function(resource, body, cb){
            $http.post('/api/'+ resource)
        }

        vs.getByAnyProp = (resource, param, value, cb) => {
            // console.log("args..." +resource+param+value)
            $http.get('/api/' + resource + "?" + param + "=" + value)
                .then(function (res) {
                    cb(res.data)
                    vs.reservation = res.data
                    console.log(vs.reservation)
                })
            return vs.reservation
        }

        vs.getScouts = (reservationId, cb) => {
            $http.get('/api/scouts/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    vs.scouts = res.data
                    console.log(vs.scouts)
                })
            return vs.scouts
        }

        // vs.getLeaders = (reservationId, cb) => {
        //     $http.get('/api/leaders/' + reservationId)
        //         .then(function (res) {
        //             cb(res.data)
        //             vs.leaders = res.data
        //             console.log(vs.leaders)
        //         })
        //     return vs.leaders
        // }

        vs.reservationGetById = (reservationId, cb) => {
            $http.get('/api/reservations/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    vs.reservation = res.data
                    console.log(vs.reservation)
                })
            return vs.reservation
        }

        vs.editAny = (resource, id, body, resolve, reject) => {
            $http.put('/api/' + resource + 's/' + id, body)
                .then(function (res) {
                    resolve(res)
                }).catch(function (error) {
                    reject(error)
                })
        }

    })

    .controller('vrController', function (vrService, $state, $http) {

        let vc = this;
        vc.newchief = [{registrationId: vc.reservationId,}]
        vc.newleader = [{registrationId: vc.reservationId,}]
        vc.reservation = ['']
        vc.scoutreservation = ['']
        vc.prop = ''
        vc.resource = '0'
        vc.chiefs = ['']
        vc.error = false
        vc.reservationId = $state.params.reservationId
        vc.newscout = [{

        // 'registrationId': vc.reservationId
        }
    ]
        vc.userId = $state.params.userId
        vc.viewState = {
            table: {
                editMode: false
            }
        }

        vc.resources = [
            {
                name: "scouts",
                displayName: "Scouts",
                props: [
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
                name: "leaders",
                displayName: "Leaders",
                props: [
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    },
                    {
                        name: "phone",
                        displayName: "Phone Number"
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                    },
                    {
                        name: "paid",
                        displayName: "Paid",
                    }
                ]

            },
            {
                name: "chiefs",
                displayName: "Chiefs",
                props: [
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                    },
                    {
                        name: "paid",
                        displayName: "Paid",
                    }
                ]

            },
            {
                name: "reservations",
                displayName: "Reservation",
                props: [
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
            }

        ]

        vc.tableProps = [
            {
                name: "scouts",
                displayName: "Scouts",
                props: [
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                    },
                    {
                        name: "paid",
                        displayName: "Paid",
                    }
                ]
            },
            {
                name: "leaders",
                displayName: "Leaders",
                props: [
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    },
                    {
                        name: "phone",
                        displayName: "Phone Number"
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                    },
                    {
                        name: "paid",
                        displayName: "Paid",
                    }
                ]

            }, {
                name: "chiefs",
                displayName: "Chiefs",
                props: [
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "shirtSize",
                        displayName: "Shirt Size"
                    },
                    {
                        name: "name",
                        displayName: "Name"
                    },
                    {
                        name: "healthForm",
                        displayName: "Health Form",
                    },
                    {
                        name: "paid",
                        displayName: "Paid",
                    }
                ]

            },
            {
                name: "reservations",
                displayName: "Reservation",
                props: [
                    {
                        name: "campNum",
                        displayName: "Camp Number"
                    },
                    {
                        name: "packNum",
                        displayName: "Pack Number"
                    },
                    {
                        name: "reservationNum",
                        displayName: "Reservation Number"
                    },
                    {
                        name: "location",
                        displayName: "Camp Location"
                    },
                    {
                        name: "locationName",
                        displayName: "Location Name"
                    },
                    {
                        name: "date",
                        displayName: "Camp Date",
                    },
                    {
                        name: "goldCard",
                        displayName: "Gold Card"
                    },
                    {
                        name: "paidToDate",
                        displayName: "Paid To Date"
                    },
                    {
                        name: "balance",
                        displayName: "Outstanding Balance"
                    },
                    {
                        name: "paidInFull",
                        displayName: "Paid In Full"
                    },
                    {
                        name: "active",
                        displayName: "Active"
                    },
                    {
                        name: "paymentDate",
                        displayName: "Date Paid"
                    },
                    {
                        name: "receiptNum",
                        displayName: "Receipt Number"
                    }
                ]
            }

        ]

        this.getYears = function () {
            vrService.getCurrentYears(
                function (years) {
                    vc.years = years
                    console.log(years)
                }
            )
        }

        this.getCamps = function () {

            vrService.getCampsByYear(
                vc.yearId,
                camps => {
                    vc.camps = camps
                }
            )
        }

        // vc.getLeaders = function(reservationId){
        //     vrService.getLeaders(reservationId, function(res){
        //         vc.leaders= res
        //     })
        // }

        // vc.getLeaders(vc.registrationId)

        vc.getScouts = function (reservationId) {
            vrService.getScouts(reservationId, function (res) {
                vc.scouts = res
                // console.log(vc.scouts)
            })
        }

        vc.getScouts(vc.reservationId)

        vc.setResource = function (index) {
            // console.log(ad.resources[index].name)
            return vc.resources[index].name
        }

        vc.getLeaders = function (reservationId) {
            vrService.getByAnyProp("leaders", "reservationId", reservationId, function (res) {
                vc.leaders = res;
            })
        }

        vc.getLeaders(vc.reservationId)

        vc.getChiefs = function (reservationId) {
            vrService.getByAnyProp("chiefs", "reservationId", reservationId, function (res) {
                vc.chiefs = res;
            })
        }

        vc.getChiefs(vc.reservationId)

        vc.reservations = function (value) {
            // debugger

            console.log('its working...')
            vrService.getByAnyProp("reservations", "id", value, function (res) {
                vc.reservations = res;
            })

            // abService.reservationGetById(value, function (reserv) {
            //     ad.resDetails = reserv;
            // })
            // console.log('res are here')
            // console.log(vc.reservations)

        }

        vc.reservations(vc.reservationId)

        // vc.reservations(vc.userId)

        vc.save = function (id, resource, name) {
            name = name.split("")
            name.pop()
            name = name.join('')
            let body = {}
            body[name] = resource
            // resource = { name: resource }
            vrService.editAny(name, id, body, function (save) {
                console.log(save)

            })
        }

        vc.reset = function () {
            vc.error = false
        }
        vc.remove = function (id, scout, index) {
            // debugger
            if (!window.confirm("Are you sure?")) {
                return
            }
            var reserve = scout.reservationId
            // console.log(reserve)
            var scout = {
                "scout":
                {
                    "id": id,
                    "campId": "removed",
                    "reservationId": "removed"
                }
            }
            vrService.editScout(id, scout, function (res) {
                // console.log(res)
                vc.reservation.splice(index, 1)
            }, function (res) {
                console.error(res)
            })
        }

        vc.add = function (resource, obj) {
            console.log("incoming!")
            obj['registrationId'] =  vc.reservationId

        }



    })

    // function ViewRegController() {
    //     let vc = this;


    // }

    .component('viewreg', {
        controller: 'vrController',
        controllerAs: 'vc',
        template: template
    });

// FaqController.$inject = [];



exports[Component] = Component;