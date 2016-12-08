import angular from 'angular'
import './stylesheets/viewcamp.scss'
import template from './templates/viewcamp.html'
const Component = 'viewcamp';

angular.module(`app.components.${Component}`, [])

    .service('viewcampService', function($http) {
        var vs = this;

        vs.getCamp = function (campId, cb) {
            $http({
                method: 'GET',
                url: '/api/camps/' + campId
            }).then(function (res) {
                vs.camp = res.data;
                return cb(vs.camp);
            })
        }
    })

    .controller('viewcampController', function(viewcampService, $http, $state) {
           let $ctrl = this;
            var vc = this;
            vc.camp=''
            vc.campNum=$state.params.campId
           
           this.getCamp = function(campId){
            viewcampService.getCamp(campId, function(camp){
                vc.camp = camp[0]
                console.log(vc.camp)
            })
        }
            this.getCamp(vc.campNum)

    })

    .component('viewcamp',{
        controller: 'viewcampController',
        template: template
    });

exports[Component] = Component;
