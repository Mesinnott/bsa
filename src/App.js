import angular from 'angular'
import uiRouter from "angular-ui-router"
import {dependencies} from './components/components'
import styles from 'bootstrap-material-design'


let App = angular.module('bsa', [...dependencies, uiRouter])
App.config(function ($urlRouterProvider, $stateProvider) {
            
            $stateProvider
                .state({
                    name:'reg',
                    url:'/register',
                    template:'<reg></reg>'
                })
                .state({
                    name: 'login',
                    url: '/login',
                    template:'<login></login>'
                })
                .state({
                    name:'directory',
                    url:'/admin/directory',
                    template:'<directory></directory>'
                })
                .state({
                    name:'home',
                    url:'/',
                    template:'<home></home>'
                })
                .state({
<<<<<<< HEAD
                    name:'campAvail',
                    url:'/campavail',
                    template:'<campavail><campavail>'
=======
                    name:'campavail',
                    url:'/campavail',
                    template:'<campavail></campvail>'
>>>>>>> ca0b7bbf53f13e444b83f0ff23d01bd0072a7a3a
                })
            $urlRouterProvider.otherwise('/'); // we may want to change this
        })

App.component('app', {
  template: `<ui-view></ui-view>`,
  controller() { 
    // $.material.init()
  }
})


export {
  App
}