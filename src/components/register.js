const Component = 'register'
// Use this as a template.
angular.module(`app.components.${Component}`, [])

    .component('register', {
        controller: RegisterController,
        controllerAs: 'rc',
        template: 'register.html'
    });

    RegisterController.$inject = [];

    function RegisterController() {

        let rc = this;

        rc.email = '';
        rc.password = '';

        rc.register = function () {

            firebase.auth().createuserWithEmailAndPassword(rc.email, rc.password)
                .then((newUser) => {

                    firebase.database().ref('/users/' + newUser.uid).set({
                        id: newUSer.uid,
                        email: newUser.email

                    })
                    console.log(newUser);

                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }