import angular from 'angular'
import template from './templates/navbar.html'
const Component = 'navbar'

angular.module(`app.components.${Component}`, [])

    .component('navbar', {
        controller: NavController,
        controllerAs: 'nc',
        template: template
    });

NavController.$inject = ['loginService', '$document', '$window', '$scope', '$state'];

function NavController(loginService, $document, $window, $scope, $state) {
    let nc = this;
    nc.test = "test"
    nc.auth = 'i'

    console.log(nc.auth)
    loginService.checkAuth(a => { nc.auth = a; console.log("AUTH::::::" + nc.auth) })
    //    console.log("AUTH: " + nc.auth)

    //    console.log("test "+ loginService.currentAuth)
    //    console.log("aauth= "+ nc.auth)
    //    console.log(nc.auth)

    nc.test = function () {
        console.log('working')
        loginService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'reservation') {
                $state.go('viewreg')
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
        loginService.checkAuth(a => {
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
        loginService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'admin') {
                $state.go('admin')
            }
            else {
                $state.go('faq')
                console.log('fail')
            }
        })
        // nc.message = "You do not have proper clearance to go there"
    }


    $document.on('scroll', function () {
        // do your things like logging the Y-axis
        console.log($window.scrollY);

        // or pass this to the scope
        $scope.$apply(function () {
            $scope.pixelsScrolled = $window.scrollY;

        })
    });
}

exports[Component] = Component;