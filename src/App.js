import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('app', dependencies)

App.component('app', {
  template: `<div>
    <potter></potter>
  </div>`,
  controller() { }
})

export {
  App
}