
import template from './templates/campAvail.html'
import './stylesheets/campAvail.scss'

const Component = 'campavail'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('availabilityService', function ($http) {
    var av = this;
    // var url1 = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
    // var yearId= 'ss'
    av.checkAllCamps = () => {
      $http.get('/api/camps/' + yearId)
        .then(function (res) {
          console.log(res.data)
          av.camps = res.data
          av.camps = av.camps.sort(function(a,b){
            return a.date-b.date
          })
        })
        return av.camps
    }
  })

  .controller('availabilityController', function (availabilityService, $http) {

    let $ctrl = this;
    $ctrl.test = 'testing 123'
    this.camps=availabilityService.checkAllCamps()
  })
  .component(Component, { 
    template: template,
    controller: 'availabilityController'

  })

exports[Component] = Component