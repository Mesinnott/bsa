import angular from 'angular'
import './home.scss'
import template from './home.html'
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

exports.component = Component;