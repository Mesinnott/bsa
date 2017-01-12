import angular from 'angular'
import './faq.scss'
import template from './faq.html'
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

exports.component = Component;