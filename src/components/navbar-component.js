import angular from 'angular'
import template from './templates/navbar.html'
const Component = 'navbar'

angular.module(`app.components.${Component}`, [])

    .component('navbar', {
        controller: NavController,
        controllerAs: 'nc',
        template: template
    });

    NavController.$inject = ['$document', '$window', '$scope'];

    function NavController($document, $window, $scope){
        let nc = this;
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