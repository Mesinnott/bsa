import template from './templates/register.html'
import './stylesheets/register.scss'
const Component = 'register'
// Use this as a template.
angular.module(`app.components.${Component}`, [])
    .controller('RegisterController', function RegisterController($state) {

        let rc = this;

        rc.email = '';
        rc.password = '';
        console.log($state)
        rc.register = function () {
            $state.transitionTo('loading', {arg:''})
            console.log($state)
            firebase.auth().createUserWithEmailAndPassword(rc.email, rc.password)
                .then((newUser) => {
                    
                    firebase.database().ref('/users/' + newUser.uid).set({
                        id: newUser.uid,
                        email: newUser.email,
                        

                    })

                    newUser.sendEmailVerification();
                    console.log(newUser);
                })
                .catch((error) => {
                    console.log(error);
                });


                var user= firebase.auth().currentUser;
                console.log(rc.name)
                user.updateProfile({
                    
                    displayName: rc.name
                }).then(function(){
                    console.log("update successful, name is:")
                }, function (error){
                    console.log("there was an error" + error)
                })
        }

    })
    .component('register', {
        controller: 'RegisterController',
        controllerAs: 'rc',
        template: template
    });




exports[Component] = Component