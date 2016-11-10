angular.module('reg')
    .component('regComponent', {
        templateUrl: '/reg.html',
        controller: RegController,
        
    })


function RegController(){
    rc = this
    rc.regs = [];

    function Person(first, last, shirt, title, health){
        this.first = first;
        this.last = last;
        this.shirt = shirt;
        this.title = title;
        this.health = health; 
    }

    function Contact(first, last, position, email, phone){
        this.first = first;
        this.last = last;
        this.position = position;
        this.email = email;
        this.phone = phone;
    }

        
    rc.receipt = function(){
        
    }
}