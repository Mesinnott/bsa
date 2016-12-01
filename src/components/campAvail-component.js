import template from './templates/campavail.html'
import './stylesheets/campavail.scss'
const Component = 'campavail'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('avService', function ($http) {
    var av = this;
    av.camps = [''];
    // var url1 = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
    var yearId= '62cde5b1-e09f-41ca-b45e-ccf4c45f0df8'
    av.checkAllCamps = (cb) => {
      $http.get('/api/camps?yearId=' + yearId)
        .then(function (res) {
          av.camps = res.data
          av.camps = av.camps.sort(function(a,b){
            return a.date-b.date
          },0)
        cb(av.camps)
        })
    }
  })
  .controller('avController', function (avService, $http) {
    let $ctrl = this;
    $ctrl.test = 'testing 123'
    this.camps=avService.checkAllCamps(console.log)
  })
  .component(Component, { 
    template: template
  })

exports[Component] = Component