// import angular from 'angular'
// const Component = 'reg'
// angular.module(`app.components.${Component}`)
//     .component(Component, {
        // templateUrl: 'reg.html',
//         controller: RegController,
//     })

// console.log("IM RUNNING")
// function RegController(){
//     rc = this
//     rc.regs = [];

//     function Person(first, last, shirt, title, health){
//         this.first = first;
//         this.last = last;
//         this.shirt = shirt;
//         this.title = title;
//         this.health = health; 
//     }

//     function Contact(first, last, position, email, phone){
//         this.first = first;
//         this.last = last;
//         this.position = position;
//         this.email = email;
//         this.phone = phone;
//     }

        
//     rc.receipt = function(){
        
//     }
// }

// exports[Component] = Component


import angular from 'angular'
import template from './reg.html'
const Component = 'reg'

angular.module(`app.components.${Component}`, [])
  .component(Component,{
    template: template,
    controller () {
      let $ctrl = this;
      $ctrl.test = 'testing 123'
    } 
  })

exports[Component] = Component