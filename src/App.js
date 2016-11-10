import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('bsa', dependencies)

App.component('app', {
  template: `<div>

   <reg-component></reg-component>

  YO ITS WORKING
    <reg></reg>

  </div>`,
  controller() { }
})

export {
  App
}