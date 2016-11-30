import angular from 'angular'
import './director.scss'
import './group-builder'
const Component = 'director';

angular.module(`app.components.${Component}`, [])

    .component('director',{
        controller: DirectorController,
        controllerAs: 'dc',
        templateUrl: 'director.html'
    });

    DirectorController.$inject = [];

    function DirectorController() {
        let dc = this;
        
        // dc.buildGroups = function(camp) {
        //     var scouts = [api request for scouts in camp];

        // }

    }

exports[Component] = Component;