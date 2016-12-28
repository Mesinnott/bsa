import template from './templates/reg.html'
import './stylesheets/reg.scss'
import {
    campForm,
    actionBar,
    adultForm,
    camperForm,
    bsaAdultForm,
    firstContactForm,
    secondContactForm
} from './templates/forms/forms.js'
import {
    adultsTable,
    campersTable
} from './templates/tables/tables.js'
const Component = 'reg'

angular.module(`app.components.${Component}`, [])
  .controller('RegController', RegController )
    .directive("formCamp", function(){
        return {
            template: campForm,
        }
    })
    .directive("formAdult", function(){
        return {
            template: adultForm,
        }
    })
    .directive("formCamper", function(){
        return {
            template: camperForm,
        }
    })
    .directive("formBsaAdult", function(){
        return {
            template: bsaAdultForm,
        }
    })
    .directive("formFirstContact", function(){
        return {
            template: firstContactForm,
        }
    })
    .directive("formSecondContact", function(){
        return {
            template: secondContactForm,
        }
    })
    .directive("tableCampers", function(){
        return {
            template: campersTable,
        }
    })
    .directive("tableAdults", function(){
        return {
            template: adultsTable,
        }
    })
    .directive("barAction", function(){
        return{
            template:actionBar
        }
    })
    .component("shirtSelect", {
            bindings: {
                model:'=',
                required:'='
            },
            template:`
                                <div class="select-container">
                                    <i class="material-icons">&#xE313;</i>
                                    <select name="" id="" class="form-control" ng-change="console.log(model)" ng-model="ss.model" required="ss.required">
                                        <option value="" ng-if="!ss.required">None</option>
                                        <option ng-repeat="shirtSize in ss.shirtSizes" ng-value="shirtSize.name">
                                            {{shirtSize.displayName}}
                                        </option>
                                    </select>
                                </div>
                      `,
            controller:function($scope, bsaConstants){
                let ss = this;
                ss.shirtSizes = bsaConstants.shirtSizes;
            },
            controllerAs:'ss'
    })
    .component(Component,{ 
        template: template
    })

  function RegController($http, $state, $scope, userService, bsaConstants, sessionService){
    let rc = this

    rc.shirtSizes = bsaConstants.shirtSizes;
    rc.adultNeeded = false;
    rc.healthBoxChecked = false;
    rc.campNum;
    rc.camp;
    rc.password;

    rc.isAdmin = sessionService.getAuth() == "admin"

    (function(){
        $http.get('/api/camps/'+$state.params.campId)
            .then(function(camps){
                rc.camp = camps.data[0];
                rc.campNum = rc.camp.campNum;
                console.log(camps)
            }).catch((error)=>{
                console.error(error)
            })
    })()
    rc.packNum = '';
    rc.reg = {
        campers: [],
        adults: [],
        regAdult: {},
        contacts: [],
        campNum: 0,
        packNum: 0
    }
    let personProps = [
        {
            name:"first",
            displayName:"First Name",
        },
        {
            name:"last",
            displayName:"Last Name",
        },
        {
            name:"shirt",
            displayName:"Shirt Size"
        }
    ]
    rc.resources = [
        {
            name:"adult",
            displayName:"Adult",
            editMode:false,
            props:personProps,
        },
        {
            name:"denChief",
            displayName:"Den Chief",
            editMode:false,
            props:personProps,
        },
        {
            name:"campers",
            displayName:"Camper",
            editMode:false,
            props:personProps,
        }
    ]
    rc.selectedResource = ''

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
        this.first = first
        this.last = last
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
        console.log(rc.reg.adults)
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
            rc.adultNeeded = false;
        }
        rc.healthBoxChecked = false;
        console.log(rc.reg.campers)
        rc.currentCamper = {};
    }
    rc.removeCamper = function(index){
        if(window.confirm(`Are you sure you want to delete this?`)){
            rc.reg.campers.splice(index, 1)
        }
    }
       

   
    
// Submit
    
    rc.sendForm = function(){
        rc.addContact(rc.firstContact);
        rc.addContact(rc.secondContact);
        rc.addRegAdult(rc.regAdult)
        rc.reg.campNum = rc.campNum;
        rc.reg.packNum = rc.packNum;
        console.log(rc.reg)
        rc.reg.adults.forEach(a=>{
            a.name = a.first + " " + a.last 
        })
        rc.reg.campers.forEach(c=>{
            c.name = a.first + " " + a.last
        })
        rc.reg.contacts.forEach(c=>{
            c.reservation = true;
            c.displayName = c.first + " " + c.last;
            c.password = rc.password
        })
        let formattedData = {
            firstUser:rc.reg.contacts[0],
            secondUser:rc.reg.contacts[1],
            registration:{
                packNum: rc.reg.packNum,
                packId: "Set Below",
                campId: rc.camp.id,
                email:rc.reg.contacts[0].email,
                goldCard: false
            }

        }
        userService.createUser(formattedData.firstUser, "isReservation")
            .then(
                firstUser=>{
                        formattedData.registration.leader1 = firstUser;
                        userService.createUser(formattedData.secondUser, "isReservation")
                        .then(
                            secondUser=>{
                                formattedData.registration.leader2 = secondUser;
                                $http.get('/api/packs?number=' + formattedData.registration.packNum)
                                    .then(
                                        pack=>{
                                            formattedData.registration.packId = pack.data.id;
                                            return new Promise(
                                                (resolve, reject)=>{
                                                    try{
                                                        resolve(pack)
                                                    }catch(error){
                                                        reject(error)
                                                    }
                                                }
                                            )
                                        }
                                    )
                                    .catch(
                                        error=>{
                                            return (
                                                $http.post('/api/packs', {
                                                    number:formattedData.registration.packNum,
                                                    charter:"Not Set",
                                                    districtId:"Not Set"
                                                })
                                            )
                                        }
                                    )
                                    .then(
                                        pack=>{
                                            formattedData.registration.packId = pack.data.id;
                                            return(
                                                $http.post('/api/reservations', formattedData.registration)
                                            )
                                        }
                                    )
                                    .then(
                                        reservation=>{
                                            console.log("Your spot is reserved.")
                                        }
                                    )
                                    .catch(
                                        error=>{
                                            console.error(error)
                                        }
                                    )
                            })
                    })
                
                
    }
            
    // rc.reg = {
    //     campers: [],
    //     adults: [],
    //     regAdult: {},
    //     contacts: [],
    //     campNum: 0,
    //     packNum: 0
    // }

        //   $.material.init()
        //   $.material.checkbox()
        //   $.material.togglebutton()
          
  }

exports[Component] = Component