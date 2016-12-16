import angular from 'angular'
import './stylesheets/adminAdd.scss'
import template from './templates/adminAdd.html'
const Component = 'adminadd';

angular.module(`app.components.${Component}`, [])

    .service('addService', function ($http, $state) {
        var ad = this;
        debugger;

        ad.add = (resource, obj, resolve, reject) => {
            $http.post('/api/' + resource, obj)
                .then(function(res){
                    resolve(res)
                }).catcj(function(error){
                    reject(error)
                })
        }

      
    })

    .controller('addController', function (addService, $http, $state) {
        let $ctrl = this;
        var ac = this;

        ac.object=''
        

        ac.addSomething = function( resource, obj){
            console.log('hello')
            addService.add(resource)

        }


        
    })

    .component('adminadd', {
        controller: 'addController',
        template: template
    });

exports[Component] = Component;