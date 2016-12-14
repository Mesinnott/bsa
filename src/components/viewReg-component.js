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

        vs.getLeaders = (reservationId, cb) => {
            $http.get('/api/leaders/' + reservationId)
                .then(function (res) {
                    cb(res.data)
                    vs.leaders = res.data
                    console.log(vs.leaders)
                })
            return vs.leaders
        }

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
        vc.test = 'testing 123'
        vc.reservation = ['']
        vc.prop = ''
        vc.resource = '0'
        vc.error = false
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
                        name: "reservationNum",
                        displayName: "Reservation Number"
                    },
                    {
                        name: "paidInFull",
                        displayName: "Paid In Full"
                    },
                    {
                        name: "name",
                        displayName: "Name"
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
                    },
                    {
                        name: "paid",
                        displayName:"Paid",
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
                        name: "phone",
                        displayName: "Phone Number"
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
            {
                name: "reservations",
                displayName: "Reservation",
                props:[
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
                        name:"location",
                        displayName:"Camp Location"
                    },
                    {
                        name: "locationName",
                        displayName: "Location Name"
                    },
                    {
                        name:"date",
                        displayName:"Camp Date",
                    },
                    {
                        name:  "goldCard",
                        displayName:"Gold Card"
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
                        name:"paidInFull",
                        displayName: "Paid In Full"
                    },
                    {
                        name:"active",
                        displayName:"Active"
                    },
                    {
                        name:"paymentDate",
                        displayName:"Date Paid"
                    },
                    {
                        name:  "receiptNum",
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


        vc.setResource=function(index){
            // console.log(ad.resources[index].name)
            return vc.resources[index].name
        }


  vc.reservations = function (value) {
            // debugger

            console.log('its working...')
            vrService.getByAnyProp(vc.setResource(vc.resource), vc.prop, value, function (res) {
                vc.reservation = res;
            })

            // abService.reservationGetById(value, function (reserv) {
            //     ad.resDetails = reserv;
            // })

        }

        vc.save = function (id, resource, name) {
            name = name.split("")
            name.pop()
            name=name.join('')
            let body= {}
            body[name]=resource
            // resource = { name: resource }
            vrService.editAny(name, id, body, function (save) {
                console.log(save)

            })
        }

        vc.reset= function(){
            vc.error=false
        }
           vc.remove = function (id, scout, index) {
            // debugger
            if(!window.confirm("Are you sure?")){
                return
            }
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
            vrService.editScout(id, scout, function (res) {
                console.log(res)
                vc.reservation.splice(index, 1)
            }, function (res) {
                console.error(res)
            })
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