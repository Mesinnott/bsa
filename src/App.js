import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('bsa', dependencies)

App.component('app', {
  template: `<div>
    <test-component></test-component>
  </div>`,
  controller() { }
})

export {
  App
}