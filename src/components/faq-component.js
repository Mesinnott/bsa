import angular from 'angular'
import './stylesheets/faq.scss'
import template from './templates/faq.html'
const Component = 'faq';

angular.module(`app.components.${Component}`, [])

    .component('faq',{
        controller: FaqController,
        controllerAs: 'fc',
        template: template
    });

    FaqController.$inject = [];

    function FaqController() {
        let fc = this;
        

    }

exports[Component] = Component;