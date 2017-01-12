import template from './register.html'
import './register.scss'
const Component = 'register'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
    .component('register', {
        controller: RegisterController,
        controllerAs: 'rc',
        template: template
    })
    .factory('userService', 
        function($state){

            return{
                createUser,
            }
            function createUser(freshUser, isReservation) {
                // $state.transitionTo('my.state', {arg:''})
                return firebase.auth().createUserWithEmailAndPassword(freshUser.email, freshUser.password)
                    .then((newUser) => {

                        function formatUser(rawUser){
                            let u = rawUser;
                            delete u.password;
                            u.id = newUser.uid;
                            u.email = newUser.email;
                            u.displayName = rawUser.displayName;
                            u.super = false;
                            u.admin = false;
                            u.director = false;
                            u.reservation = !!isReservation;
                            return u;
                        }
                        // rc.message="You have successfully created a User account.  Check your email for verification, and please login"

                        var user = firebase.auth().currentUser;


                        user.updateProfile({ // Firebase Virtual Auth User
                            displayName: freshUser.displayName,
                        }).then(function () {
                            newUser.sendEmailVerification();
                            console.log(newUser);
                            // Update successful.
                        }, function (error) {
                            // An error happened.
                            console.error(error)
                        });
                        let message="You have successfully created a User account, and are logged in.  Please get an administrator to give you Authorizations."
                        $state.go('home')

                        return firebase.database().ref('/api/users/' + newUser.uid).set(formatUser(freshUser)) // User accessible in DB // returns Promise
                    })
                    .catch((error) => {
                        console.error(error);
                    });


        }
    })

RegisterController.$inject = ['$state'];

function RegisterController($state) {
    let rc = this;
    rc.email = '';
    rc.password = '';
    rc.fullName = "";

    rc.error= false;
    rc.message= false;


    rc.register = function () {
        // $state.transitionTo('my.state', {arg:''})
        firebase.auth().createUserWithEmailAndPassword(rc.email, rc.password)
            .then((newUser) => {
                // rc.message="You have successfully created a User account.  Check your email for verification, and please login"
                firebase.database().ref('/api/users/' + newUser.uid).set({
                    id: newUser.uid,
                    email: newUser.email,
                    displayName: rc.fullName,
                    super: false,
                    admin: false,
                    director: false,
                    reservation: false,

                })

                var user = firebase.auth().currentUser;


                user.updateProfile({
                    displayName: rc.fullName,
                }).then(function () {
                newUser.sendEmailVerification();
                console.log(newUser);
                    // Update successful.
                }, function (error) {
                    // An error happened.
                });
                 rc.message="You have successfully created a User account, and are logged in.  Please get an administrator to give you Authorizations."
                $state.go('home')
            })
            .catch((error) => {
                rc.error=error.message;
                console.log(error);
            });


    }




}

exports.component = Component