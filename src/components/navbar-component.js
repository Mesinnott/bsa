import angular from 'angular'
import template from './templates/navbar.html'
const Component = 'navbar'

angular.module(`app.components.${Component}`, [])

    .component('navbar', {
        controller: NavController,
        controllerAs: 'nc',
        template: template
    });

    NavController.$inject = ['loginService', '$document', '$window', '$scope'];

    function NavController(loginService, $document, $window, $scope){
        let nc = this;
        nc.test= "test"
        nc.auth = 'i'
<<<<<<< HEAD

       nc.auth = loginService.checkAuth()

=======
        console.log(nc.auth)
        loginService.checkAuth(a=>{nc.auth = a; console.log("AUTH::::::" + nc.auth)})
       console.log("AUTH: " + nc.auth)
>>>>>>> 0177e8867a1532ff99a6293c3f7ce00abbc4e808
       console.log("test "+ loginService.currentAuth)
       console.log("aauth= "+ nc.auth)
    //    console.log(nc.auth)



        $document.on('scroll', function() {
            // do your things like logging the Y-axis
            console.log($window.scrollY);

            // or pass this to the scope
            $scope.$apply(function() {
                $scope.pixelsScrolled = $window.scrollY;
            })
        });
    }

exports[Component] = Component;