
import template from './templates/campAvail.html'
import './stylesheets/campAvail.scss'

const Component = 'campavail'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
  .service('avService', function ($http) {
    var av = this;
    av.camps = [''];
    // var url1 = 'https://bcw-getter.herokuapp.com/?url=http%3A%2F%2Fquotesondesign.com%2Fapi%2F3.0%2Fapi-3.0.json'
    av.getCurrentYears = (cb)=>{
      let currentYear = new Date().getFullYear()
      currentYear = 2016
      let nextYear = currentYear++
      let route = `/api/years?year=${currentYear}&year=${nextYear}`
      console.log(route)
      $http.get(route)
        .then(function(res){
          cb(res.data)
          console.log(res.data)
          console.log("resdata^^^^")
        }).catch(console.error)
    }
    av.getCampsByYear = (yearId, cb) => {
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
  .controller('avController', function (avService, $http, $scope) {
    let av = this;
    let S = $scope
    av.selectedYearIndex = 0
    av.currentYear = new Date().getFullYear()
    av.camps = []
    S.years = []
    avService.getCurrentYears(
      function(years){
        S.years = years
        av.setCamps()
      }
    )
    av.setCamps = function setCamps(){
      avService.getCampsByYear(
        S.years[av.selectedYearIndex].id,
        camps=>{
          av.camps = camps.sort(
            (a,b)=>{
              return a.campNum - b.campNum
            },0
          )
          av.currentYear = S.years[av.selectedYearIndex].year
        }
      )
    }

  })
  .component(Component, { 
    template: template,
    controller: 'avController'
  })

exports[Component] = Component

