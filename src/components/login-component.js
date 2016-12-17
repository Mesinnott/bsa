import angular from 'angular'
import template from './templates/login.html'
import './stylesheets/login.scss'

const Component = 'login'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .factory('sessionService', function ($http, $state) {

        let currentUser = ''
        let currentId = ''
        let dbuser = ''
        let currentAuth = null

        function logOut(){
            firebase.auth().signOut().then(console.log).catch(console.log)
            lc.message = "You Have Been Logged Out"
        }

        function checkAuth(cb) {

            currentUser = firebase.auth()
            if (!currentUser.currentUser) {
                console.log('not logged in')
                currentAuth = null
                cb(currentAuth)
                return currentAuth
            }
            if (currentUser.currentUser) {
                console.log('someone is logged in')
                currentId = currentUser.currentUser.uid

                return getUser(currentId, function (res) {
                    // console.log(res)
                    dbuser = res.data
                    if (dbuser[0].super == true) {
                        // console.log('super')
                        currentAuth = 'super'
                    } else if (dbuser[0].admin == true) {
                        // console.log('admin')
                        currentAuth = 'admin'
                    } else if (dbuser[0].director == true) {
                        // console.log('director')
                        currentAuth = "director"
                    } else if (dbuser[0].reservation == true) {
                        // console.log("reservation")
                        currentAuth = "reservation"
                    }
                    console.log("current authentication standard is " + currentAuth)
                    cb(currentAuth)
                    return currentAuth

                })
            }
        }


        function getUser(id, cb) {
            $http({
                method: 'GET',
                url: '/api/users?id=' + id
            }).then(function (res) {
                // lc.user = res
                let hello = res
                return cb(hello);
            })
            .catch(
                console.error
            )
        }


        return {
            getUser: getUser,
            checkAuth: checkAuth,
            currentUser: currentUser,
            currentId: currentId,
            dbuser: dbuser,
            currentAuth: currentAuth,
            logOut: logOut,
        };






    })

    .component('login', {
        controller: LoginController,
        controllerAs: 'lc',
        template: template
    });


LoginController.$inject = ['sessionService', '$state', '$http'];

function LoginController(sessionService, $state, $http) {
    let lc = this;

    lc.email = '';
    lc.password = '';
    lc.clearance = 'none'
    lc.message = false
    lc.error = false
    lc.user = {}

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
        currentAuth = 'none'
        lc.message = "You Have Been Logged Out"
    }

    lc.lostPassword = function () {
        var auth = firebase.auth();
        let email = lc.email
        console.log(email)

        auth.sendPasswordResetEmail(email).then(function () {
            // Email sent.
            lc.message = "An Email has Been Sent To Reset Your Password"
        }, function (error) {
            // An error happened.
            lc.error = error.message
        });
    }



    lc.login = function () {
        firebase.auth().signInWithEmailAndPassword(lc.email, lc.password)
            .then((user) => {
                // Need to get user object from db, not auth object.  then we need to compare ids to get proper user.
                sessionService.getUser(user.uid, function (res) {
                    lc.user = res.data


                    debugger
                    if (lc.user[0].super == true) {

                        lc.clearance = 'super'
                        $state.go("admin")
                        return
                    } else if (lc.user[0].admin == true) {
                        lc.clearance = 'admin'
                        $state.go("admin")
                        return
                    } else if (lc.user[0].director == true) {
                        lc.clearance = 'director'
                        $state.go("director", { userId: user.uid })
                        return
                    } else if (lc.user[0].reservation == true) {
                        lc.clearance = 'reservation'
                        $state.go("viewreg", { reservationId: user.reservationId })
                        return
                    } else {
                        lc.clearance = 'none'
                        $state.go("home")
                    }
                })
                lc.message = "You have Successfully Logged In"
                console.log('logged in: ' + user.displayName);
                console.log('clearance = ' + lc.clearance)
            })
            .catch((error) => {
                lc.error = error.message
                console.log(error);
            })

    }

    lc.checkAuth = function () {

        lc.auth = firebase.auth()
            .then((user) => {
                sessionService.checkAuth(user.uid, function (res) {
                    lc.user = res.data

                    console.log(lc.user)

                    debugger
                    if (lc.user[0].super == true) {
                        lc.clearance = 'super'
                        // $state.go("admin")
                        // return
                    } if (lc.user[0].admin == true) {
                        lc.clearance = 'admin'
                        // $state.go("admin")
                        // return
                    } else if (lc.user[0].director == true) {
                        lc.clearance = 'director'
                        $state.go("director", { userId: user.uid })
                        return
                    } else if (lc.user[0].reservation == true) {
                        lc.clearance = 'reservation'
                        $state.go("viewreg", { reservationId: user.reservationId })
                        return
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


    lc.getAuth = function () {
        sessionService.checkAuth()

    }

    lc.messageClear = function () {
        lc.message = false
    }
    lc.errorClear = function () {
        lc.error = false
    }
}






exports[Component] = Component