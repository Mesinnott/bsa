import angular from 'angular'
import './stylesheets/home.scss'
import template from './templates/home.html'
const Component = 'home';

angular.module(`app.components.${Component}`, [])

    .component('home',{
        controller: HomeController,
        controllerAs: 'hc',
        template: template
    });

    HomeController.$inject = [];

    function HomeController() {
        let hc = this;
        

    }

exports[Component] = Component;