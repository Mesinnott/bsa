import angular from 'angular'
import template from './templates/navbar.html'
const Component = 'navbar'

angular.module(`app.components.${Component}`, [])

    .component('navbar', {
        controller: NavController,
        controllerAs: 'nc',
        template: template
    });

NavController.$inject = ['sessionService', '$document', '$window', '$scope', '$state'];

function NavController(sessionService, $document, $window, $scope, $state) {
    let nc = this;
    nc.test = "test"
    nc.auth = $scope.auth

    console.log(nc.auth)
    sessionService.checkAuth(a => { nc.auth = a; console.log("AUTH::::::" + nc.auth) })
    //    console.log("AUTH: " + nc.auth)

    //    console.log("test "+ sessionService.currentAuth)
    //    console.log("aauth= "+ nc.auth)
    //    console.log(nc.auth)

    nc.test = function () {
        console.log('working')
        sessionService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'reservation') {
                $state.go('viewreg', {'reservationId':'7c7973ae-eeee-4fcb-9ee5-a52222d99eda'})
            }
            else {
                $state.go('faq')
                console.log('fail')
            }
        })
        // nc.message = "You do not have proper clearance to go there"
    }

    nc.director = function () {
        console.log('working')
        sessionService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'director') {
                $state.go('director')
            }
            else {
                $state.go('faq')
                console.log('fail')
            }
        })
        // nc.message = "You do not have proper clearance to go there"
    }

    nc.admin = function () {
        console.log('working')
        sessionService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'admin') {
                $state.go('admin', {'resource':'hello'})
            }
            else {
                $state.go('faq')
                console.log('fail')
            }
        })
        // nc.message = "You do not have proper clearance to go there"
    }


    // $document.on('scroll', function () {
    //     // do your things like logging the Y-axis
    //     console.log($window.scrollY);

    //     // or pass this to the scope
    //     $scope.$apply(function () {
    //         $scope.pixelsScrolled = $window.scrollY;

    //     })
    // });
}

exports[Component] = Component;