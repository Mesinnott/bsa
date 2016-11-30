import angular from 'angular'
import './home.scss'
const Component = 'home';

angular.module(`app.components.${Component}`, [])

    .component('home',{
        controller: HomeController,
        controllerAs: 'hc',
        templateUrl: 'home.html'
    });

    HomeController.$inject = [];

    function HomeController() {
        let hc = this;
        

    }

exports[Component] = Component;