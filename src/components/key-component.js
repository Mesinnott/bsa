import angular from 'angular'
import './stylesheets/key.scss'
import template from './templates/key.html'
const Component = 'key';

angular.module(`app.components.${Component}`, [])



    .service('keyService', function ($http, $state) {
        var ks = this;
        ks.getReservation = function (key, cb) {
            $http.get(`/api/reservations?accessKey=${key}`)
                .then(function (res) {
                    cb(res.data)
                })
        }


    })

    .controller('keyController', function (keyService, sessionService, $http, $state) {
        let $ctrl = this;
        var kc = this;
        kc.error = false
        kc.key = ''

        kc.submit = function (key) {
            keyService.getReservation(key, function (res) {
                console.log(res)
                console.log('hippo')
                if(res.length<1){
                    console.log('taco')
                    kc.error = "improper access key"
                }
                if (res[0].id) {
                    console.log('toasty')
                    let id = res[0].id
                    sessionService.checkAuth(a => {
                        kc.auth = a;
                        if (kc.auth == 'super' || kc.auth == 'reservation') {
                            $state.go('viewreg', { 'reservationId': id })
                        }
                        else {
                            kc.error = "You are not authorized to view this page";
                        }
                    })
                }
            })
        }

        kc.reset = function () {
            kc.error = false
        }



    })



    .component('key', {
        controller: 'keyController',
        template: template
    });


exports[Component] = Component;