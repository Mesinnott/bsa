
import template from './templates/campAvail.html'
import './stylesheets/campAvail.scss'

const Component = 'campavail'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('avService', function ($http) {
    var av = this;
    av.camps = [''];
    // var url1 = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
    var yearId= '62cde5b1-e09f-41ca-b45e-ccf4c45f0df8';
    av.getCurrentYears = (cb)=>{
      let currentYear = new Date().getFullYear()
      let nextYear = currentYear++
      $http.get(`/api/years?year=${currentYear}&year=${nextYear}`)
        .then(function(res){
          cb(res.data)
        })
    }
    av.checkAllCamps = (cb) => {
      $http.get('/api/camps?yearId=' + yearId)
        .then(function (res) {
          av.camps = res.data
          av.camps = av.camps.sort(function(a,b){
            return a.date-b.date
          })
          cb(av.camps)
          console.log(av.camps)
        }).catch(a=>console.log(a))
        return av.camps
    }
  })
  .controller('avController', function (avService, $http) {
    let av = this;
    av.test = 'testing 123'
    avService.getCurrentYears()
    avService.checkAllCamps(
      camps=>{
        av.camps = camps
      }
    )

  })
  .component(Component, { 
    template: template,
    controller: 'avController'
  })

exports[Component] = Component

