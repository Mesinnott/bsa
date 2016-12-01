import template from './templates/directory.html'
import './stylesheets/directory.scss'
const Component = 'directory'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('directoryService', function($http){
    var dir = this;
    // var url = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'

    dir.getAllScouts = ()=>{
      var thingy = ()=>"ITSCOMPILING"
      $http.get('/api/camps/a1c5919c-0670-4d67-9dd0-a8260a802f0a')
      .then(
        res=>console.log(res.data)
        )
      }
  })
  .controller('directoryController', function(directoryService){
      let $ctrl = this;
      $ctrl.test = 'testing 123'
      directoryService.getAllScouts()
    })
  .component(Component,{
    template: template,
    controller:'directoryController'
    
  })

exports[Component] = Component