import template from './templates/register.html'
import './stylesheets/register.scss'
const Component = 'register'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
    .controller('RegisterController', function RegisterController($state) {

        let rc = this;

        rc.email = '';
        rc.password = '';
        rc.fullName = '';
        rc.register = function () {
            $state.transitionTo('loading', {arg:''})

            firebase.auth().createUserWithEmailAndPassword(rc.email, rc.password)
                .then(
                    (newUser) => {
                    
                    firebase.database().ref('/users/' + newUser.uid).set({
                        email: newUser.email,
                        displayName: rc.fullName,
                        super: false,
                        admin: false,
                        director: false,
                        reservation: false


                        

                    }).then(console.info, console.error)
                    
                    setTimeout(newUser.sendEmailVerification, 4000)
                    // console.log(newUser);
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    })
    .component('register', {
        controller: 'RegisterController',
        controllerAs: 'rc',
        template: template
    });




exports[Component] = Component