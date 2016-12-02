import angular from 'angular'
import template from './templates/login.html'
import './stylesheets/login.scss'

// import firebase from 'firebase'

const Component = 'login'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .component('login',{
        controller: LoginController,
        controllerAs: 'lc',
        template: template
    });

    LoginController.$inject = [];


    function LoginController() {
        let lc = this;

        lc.email = '';
        lc.password = '';

        firebase.auth()
        .onAuthStateChanged(function(user){
            if (user){
                firebase.database().ref('/users/' + user.uid).once('value', (snapshot) =>{
                    console.log('logged in:', snapshot.val());
                });
                
                let newRef = firebase.database().ref('/users/').push();

                newRef.key
            }else{
                console.log('logged out')
            }
        })

        lc.logOut = function(){
            firebase.auth().signOut()
        }

        lc.login =function(){

            firebase.auth().signInWithEmailAndPassword(lc.email, lc.password)
            .then((user) => {

                console.log('logged in: ' + user);
            })
            .catch ((error)=> {
                console.log(error);
            })
        }
    }
 

exports[Component] = Component