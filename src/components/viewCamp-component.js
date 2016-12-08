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

    .controller('viewcampController', function(viewcampService, $http) {
           let $ctrl = this;
            var vc = this;
            vc.camp=''

           
           this.getCamp = function(campId){
            viewcampService.getCamp(campId, function(camp){
                vc.camp = camp[0]
                console.log(vc.camp)
            })
        }
            this.getCamp("3554e413-d6b7-43eb-b12c-9264a20ee24f")

    })

    .component('viewcamp',{
        controller: 'viewcampController',
        template: template
    });

exports[Component] = Component;
