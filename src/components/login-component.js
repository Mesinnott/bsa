import angular from 'angular'
import template from './templates/login.html'
import './stylesheets/login.scss'

const Component = 'login'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .service('loginService', function($state){

    })

    .controller('LoginController', function ($state) {
        let lc = this;

        lc.email = '';
        lc.password = '';
        lc.clearance='none'
        lc.message=false
        lc.error=false

        firebase.auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    firebase.database().ref('/users/' + user.uid).once('value', (snapshot) => {
                        console.log('logged in:', snapshot.val());
                    });

                    let newRef = firebase.database().ref('/users/').push();

                    newRef.key
                } else {
                    console.log('logged out')
                }
            })

        lc.logOut = function () {
            firebase.auth().signOut()
            lc.message="You Have Been Logged Out"
        }

        lc.lostPassword = function () {
            var auth = firebase.auth();
            let email = lc.email
            console.log(email)

            auth.sendPasswordResetEmail(email).then(function () {
                // Email sent.
            lc.message="An Email has Been Sent To Reset Your Password"
            }, function (error) {
                // An error happened.
                lc.error=error.message
            });
        }

        lc.login = function ($state) {
            firebase.auth().signInWithEmailAndPassword(lc.email, lc.password)
                .then((user) => {
                    // $state.transitionTo('director', {directorId: "4ad02250-3304-49a2-a2b5-3762432272c3"})
            // $state.go("director", { directorId: "4ad02250-3304-49a2-a2b5-3762432272c3" })
                    debugger
                    if(user.super==true){
                        lc.clearance = 'super'
                    }else if(user.admin==true){
                        lc.clearance = 'admin'
                    }else if(user.director==true){
                        lc.clearance = 'director'
                    }else if(user.reservation==true){
                        lc.clearance = 'reservation'
                    }else{
                        lc.clearance = 'none'
                    }
                    lc.message="You have Successfully Logged In"
                    console.log('logged in: ' + user.displayName);
                    console.log('clearance = '+lc.clearance)
                })
                .catch((error) => {
                    lc.error=error.message
                    console.log(error);
                })

        }
    lc.messageClear=function(){
        lc.message=false
    }
    lc.errorClear=function(){
        lc.error=false
    }
    })

        .component('login', {
            controller: 'LoginController',
            controllerAs: 'lc',
            template: template
        })

// LoginController.$inject = []


exports[Component] = Component