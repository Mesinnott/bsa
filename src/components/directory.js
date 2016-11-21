import template from './directory.html'
import './directory.scss'
const Component = 'directory'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('directoryService', function(){
    var dir = this;
    var url = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
    dir.getAllScouts = ()=>{
      var thingy = ()=>"ITSCOMPILING"
      fetch(url)
      .then(
        res=>res.json()
          .then(
            res2=>console.log(res2)
            ))}
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