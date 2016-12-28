import angular from 'angular'
import template from './templates/navbar.html'
import './stylesheets/navbar.scss'
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
    nc.auth = 'i'
    nc.error= false

    console.log(nc.auth)
    sessionService.checkAuth(a => { nc.auth = a; console.log("AUTH::::::" + nc.auth) })
    
    // function resId (){
    //     sessionService.checkAuth(a => {
    //         nc.auth = a;
    //         if (nc.auth == 'super' || nc.auth == 'reservation') {
    //      $http.get(`/api/users?year=${currentYear}&year=${nextYear}`)
    //             .then(function (res) {
    //                 cb(res.data)
    //             })




    //         }
    //     })
    // }
    //    console.log("AUTH: " + nc.auth)

    //    console.log("test "+ sessionService.currentAuth)
    //    console.log("aauth= "+ nc.auth)
    //    console.log(nc.auth)

    nc.test = function () {
        console.log('working')
        
        sessionService.checkAuth(a => {
            nc.auth = a;
            if (nc.auth == 'super' || nc.auth == 'reservation') {
                $state.go('key')

                // let key = window.prompt('please enter your access key')
                // console.log(key + " this is the key")
                // $state.go('viewreg', {'reservationId':key})
            }
            else {
                $state.go('faq')
                nc.error = "You are not authorized to view this page";
                console.log('fail')
            }
        })
        // nc.message = "You do not have proper clearance to go there"
    }

    nc.director = function () {
        console.log('working')
        sessionService.getUserId(b=>{
            let userId = b
        sessionService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'director') {
                $state.go('director', {'userId': userId})
            }
            else {
                $state.go('faq')
                nc.error = "You are not authorized to view this page";
                console.log('fail')
            }
        })
        })
        // nc.message = "You do not have proper clearance to go there"
    }

    nc.admin = function () {
        console.log('working')
        sessionService.getUserId(b=>{
            let userId = b
        sessionService.checkAuth(a => {
            nc.auth = a;
            console.log('sssss ' + nc.auth);
            if (nc.auth == 'super' || nc.auth == 'admin') {
                $state.go('admin', {'resource':userId})
            }
            else {
                $state.go('faq')
                nc.error = "You are not authorized to view this page";
                console.log('fail')
            }
        })
        })
        // nc.message = "You do not have proper clearance to go there"
    }

nc.reset = function(){
    nc.error=false
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