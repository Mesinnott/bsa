import angular from 'angular'
import {dependencies} from './components/components'


let App = angular.module('bsa', dependencies)

App.component('app', {
  template: `<div>
  YO ITS WORKING
    <directory></directory>

  </div>`,
  controller() { 
    // $.material.init()
  }
})

export {
  App
}