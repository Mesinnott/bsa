import angular from 'angular'
import uiRouter from "angular-ui-router"
import {dependencies} from './components/components'
import styles from 'bootstrap-material-design'
import PromisePolyfill from 'promise-polyfill'
if(!window.Promise){
    window.Promise = PromisePolyfill;
}
let App = angular.module('bsa', [
    ...dependencies, 
    uiRouter,
    ])
App.config(function ($urlRouterProvider, $stateProvider, $qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
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
                    url:'/register/:campId?',
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
                    name:'viewreg',
                    url:'/viewreg/:reservationId',
                    template:'<viewreg></viewreg>'
                })
                .state({
                    name:'faq',
                    url:'/faq',
                    template:'<faq></faq>'
                })
                .state({
                    name:'loading',
                    template:'<i class="fa fa-spinner" aria-hidden="true"></i>'
                })
                .state({
                    name:'adminadd',
                    url:'/adminadd',
                    template:'<adminadd></adminadd>'
                })
                .state({
                    name:'admin',
                    url:'/admin?:resource?:parameter?:query?',
                    template:'<admin></admin>',
                    resolve: {
                        auth:function(sessionService, $state){
                            console.log("running")
                            sessionService.checkAuth(
                                auth=>{
                                    console.log('running')
                                    console.log(auth)
                                    let level = auth? !(/(super)|(admin)/).test(auth) : false;
                                    if(level){ // if you're not an admin or super admin, you can't sit with us
                                        console.log("running")
                                        $state.go('home')
                                    }
                                }
                            )
                        }
                    }
                })
            $urlRouterProvider.otherwise('/'); // we may want to change this
            // $locationProvider.hashPrefix('!');
        })

App.component('app', {
  template: `

      <navbar ng-if="!$ctrl.isReceipt"/>
      <div class="container-fluid">
        <ui-view/>
      </div>
      
      `,
  controller($location) { 
    let app = this;
    this.isReceipt = $location.$$url.includes('receipt')
    // $.material.init()
  }
})


export {
  App
}