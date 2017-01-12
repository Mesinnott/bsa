let component = function(name){
    let firstLetter = name.substr(0, 1).toLowerCase()
    let titleName = name.replace(firstLetter, firstLetter.toUpperCase())
    let controllerName = titleName + "Controller"
    let controllerAsName = firstLetter + "c"
return `
import angular from 'angular'
import './${name}.scss'
import template from './${name}.html'
const Component = '${name}';

angular.module(\`app.components.\${Component}\`, [])

    .component('${name}',{
        controller: ${controllerName},
        controllerAs: '${controllerAsName}',
        template: template
    });

    ${controllerName}.$inject = [];

    function ${controllerName}() {
        let ${controllerAsName} = this;
        

    }

exports.component = Component;
`
}


module.exports = {
    component,
}