import template from './templates/reg.html'
import './stylesheets/reg.scss'
const Component = 'reg'

angular.module(`app.components.${Component}`, [])
  .controller('RegController', RegController )
  .component(Component,{
    template: template,
    controller: RegController

  })

  function RegController($http, $state){
    let rc = this
    console.log($state)
    rc.adultNeeded = false;

    rc.campNum = $state.params.campnum || '';
    rc.packNum = '';
    rc.reg = {
        campers: [],
        adults: [],
        regAdult: {},
        contacts: [],
        campNum: 0,
        packNum: 0
    }

    function Adult(first, last, shirt){
        this.first = first;
        this.last = last;
        this.shirt = shirt;
    }

    function RegAdult(first, last, date, shirt){
        this.first = first;
        this.last = last;
        this.date = date;
        this.shirt = shirt;
    }

    function Camper(first, last, shirt){
        this.first = first;
        this.last = last;
        this.shirt = shirt;
    }

    function Contact(first, last, position, email, phone){
        this.first = first;
        this.last = last;
        this.position = position;
        this.email = email;
        this.phone = phone;
    }

//  Contact Functions
    rc.firstContact = {};
    rc.secondContact = {};
    rc.addContact = function(contact){
        var cont = new Contact(contact.first, contact.last, contact.position, contact.email, contact.phone);
        rc.reg.contacts.push(cont);
    }



// Adult Functions
    rc.regAdult = {};
    rc.addRegAdult = function(person){
        var ra = new RegAdult(person.first, person.last, person.date, person.shirt);
        rc.reg.regAdult = ra
    }

    rc.currentAdult = {};
    rc.addAdult = function(adult){
        var ca = new Adult(adult.first, adult.last, adult.shirt);
        rc.reg.adults.push(ca);
        rc.adultNeeded = false;
        rc.currentAdult = {};
    }
    rc.removeAdult = function(index){
        rc.reg.adults.splice(index, 1)
    }

// Camper Functions
    rc.currentCamper = {};
    rc.addCamper = function(camper){
        var cc = new Camper(camper.first, camper.last, camper.shirt); //cc = Constructed Camper
        rc.reg.campers.push(cc);
        if(rc.reg.campers.length > 10 && rc.reg.campers.length % 5 == 1){
            rc.adultNeeded = true;
        }else{
            rc.adultNeeded = false
        }
        rc.currentCamper = {};
    }
    rc.removeCamper = function(index){
        rc.reg.campers.splice(index, 1)
    }
       

   
    
// Submit

    rc.sendForm = function(){
        rc.addContact(rc.firstContact);
        rc.addContact(rc.secondContact);
        rc.addRegAdult(rc.regAdult)
        rc.reg.campNum = rc.campNum;
        rc.reg.packNum = rc.packNum;

        console.log(rc.reg)
        $http.post("/api/something", rc.reg)
        .then(function(data){
            console.log(data)
        })
        .catch(function(err){
            console.error('NOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!')
        })
    }
            

        //   $.material.init()
        //   $.material.checkbox()
        //   $.material.togglebutton()
          
  }

exports[Component] = Component





