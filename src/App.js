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
                    name:'campavail',
                    url:'/campavail',
                    template:'<campavail></campvail>'
                })
                .state({
                    name:'viewCamp',
                    url:'/viewCamp/:campId',
                    template:'<viewCamp></viewCamp>'
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