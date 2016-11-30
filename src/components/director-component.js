import angular from 'angular'
import './stylesheets/director.scss'
import template from './templates/director.html'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .component('director',{
        controller: DirectorController,
        controllerAs: 'dc',
        template:template
    });

    DirectorController.$inject = [];

    function DirectorController() {
        let dc = this;
        
        // dc.buildGroups = function(camp) {
        //     var scouts = [api request for scouts in camp];

        // }

    }

exports[Component] = Component;