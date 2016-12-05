import template from './templates/register.html'
import './stylesheets/register.scss'
const Component = 'register'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .component('register', {
        controller: RegisterController,
        controllerAs: 'rc',
        template: template
    });

    RegisterController.$inject = [];

    function RegisterController() {

        let rc = this;

        rc.email = '';
        rc.password = '';
        rc.fullName= '';

        rc.register = function ($state) {
            // $state.transitionTo('my.state', {arg:''})
            firebase.auth().createUserWithEmailAndPassword(rc.email, rc.password)
                .then((newUser) => {
                    
                    firebase.database().ref('/users/' + newUser.uid).set({
                        id: newUser.uid,
                        email: newUser.email,
                        displayName: rc.fullName,
                        super: false,
                        admin: false,
                        director: false,
                        reservation: false,


                        

                    })

                    newUser.sendEmailVerification();
                    console.log(newUser);
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }

exports[Component] = Component