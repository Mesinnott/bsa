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
                    url:'/directory',
                    template:'<directory></directory>'
                })
                .state({
                    name:'home',
                    url:'/',
                    template:'<home></home>'
                })
            $urlRouterProvider.otherwise('/register'); // we may want to change this
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