import angular from 'angular'
import uiRouter from "angular-ui-router"
import {dependencies} from './components/components'
import styles from 'bootstrap-material-design'

let App = angular.module('bsa', [
    ...dependencies, 
    uiRouter,
    ])
App.config(function ($urlRouterProvider, $stateProvider) {
            
            $stateProvider
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
                    name:'director',
                    url:'/director/:userId',
                    template:'<director></director>'
                })
                .state({
                    name:'directory',
                    url:'/admin/directory',
                    template:'<directory></directory>'
                })
                .state({
                    name:'groups',
                    url:'/groups/:campId',
                    template:'<groups></groups>'
                })
                .state({
                    name: 'login',
                    url: '/login',
                    template:'<login></login>'
                })
                .state({
                    name:'receipt',
                    url:'/receipt',
                    template:'<receipt></receipt>'
                })
                .state({
                    name:'reg',
                    url:'/register/:campnum?',
                    template:'<reg></reg>'
                })
                .state({
                    name:'register',
                    url:'/signup',
                    template:'<register></register>'
                })
                .state({
                    name:'viewcamp',
                    url:'/viewcamp/:campId',
                    template:'<viewcamp></viewcamp>'
                })
                .state({
                    name:'loading',
                    template:'<i class="fa fa-spinner" aria-hidden="true"></i>'
                })
                .state({
                    name:'admin',
                    url:'/admin?:resource?:parameter?:query?',
                    template:'<admin></admin>'
                })
            $urlRouterProvider.otherwise('/'); // we may want to change this
            // $locationProvider.hashPrefix('!');
        })

App.component('app', {
  template: `

      <navbar/>
      <div class="container-fluid">
        <ui-view/>
      </div>
      
      `,
  controller() { 
    // $.material.init()
  }
})


export {
  App
}