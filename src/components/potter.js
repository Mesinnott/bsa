import angular from 'angular'
const Component = 'potter'
import './potter.scss'

angular.module(`app.components.${Component}`, [])
  .component(Component,{
    template: `
      <h1 ng-repeat='i in new Array>Why Hello there {{$ctrl.test}}</h1>
    `,
    controller () {
      let $ctrl = this;
      $ctrl.test = 'testing 123'
    } 
  })

exports[Component] = Component

