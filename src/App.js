import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('bsa', dependencies)

App.component('app', {
  template: `<reg></reg>`,
  controller() { 
    // $.material.init()
  }
})

export {
  App
}