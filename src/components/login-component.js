import angular from 'angular'
import template from './templates/login.html'
import './stylesheets/login.scss'

const Component = 'login'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .factory('loginService', function($http, $state) {

        function getUser(id, cb) {
            $http({
                method: 'GET',
                url: '/api/users/' + id
            }).then(function(res) {
                // lc.user = res
                return cb(res);
            })
        }

        return {
            getUser: getUser
        };

    })

    .component('login', {
        controller: LoginController,
        controllerAs: 'lc',
        template: template
    });


LoginController.$inject = ['loginService', '$state', '$http'];

function LoginController(loginService, $state, $http) {
    let lc = this;

    lc.email = '';
    lc.password = '';
    lc.clearance = 'none'
    lc.message = false
    lc.error = false
    lc.user = {}

    firebase.auth()
        .onAuthStateChanged(function(user) {
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

    lc.logOut = function() {
        firebase.auth().signOut()
        lc.message = "You Have Been Logged Out"
    }

    lc.lostPassword = function() {
        var auth = firebase.auth();
        let email = lc.email
        console.log(email)

        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
            lc.message = "An Email has Been Sent To Reset Your Password"
        }, function(error) {
            // An error happened.
            lc.error = error.message
        });
    }



    lc.login = function() {
        firebase.auth().signInWithEmailAndPassword(lc.email, lc.password)
            .then((user) => {
                // Need to get user object from db, not auth object.  then we need to compare ids to get proper user.
                loginService.getUser(user.uid, function(res) {
                    lc.user = res.data

                    if (lc.user.super == true) {
                        lc.clearance = 'super'
                        $state.go("admin")
                    } else if (lc.user.admin == true) {
                        lc.clearance = 'admin'
                        $state.go("admin")
                    } else if (lc.user.director == true) {
                        lc.clearance = 'director'
                        $state.go("director", { userId: user.uid })
                    } else if (lc.user.reservation == true) {
                        lc.clearance = 'reservation'
                        // $state.go("admin", { id: user.uid })
                    } else {
                        lc.clearance = 'none'
                        $state.go("home")
                    }
                })
                lc.message = "You have Successfully Logged In"
                console.info()
                console.log('logged in: ' + user.displayName);
                console.log('clearance = ' + lc.clearance)
            })
            .catch((error) => {
                lc.error = error.message
                console.log(error);
            })

    }
    lc.messageClear = function() {
        lc.message = false
    }
    lc.errorClear = function() {
        lc.error = false
    }
}






exports[Component] = Component