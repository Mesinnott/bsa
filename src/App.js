import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('app', dependencies)

App.component('app', {
  template: `<div>
   <reg-component></reg-component>
  </div>`,
  controller() { }
})

export {
  App
}