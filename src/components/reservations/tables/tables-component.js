import {
    adultsTable,
    campersTable
} from './tables.js'

const Component = 'tables'

angular.module(`app.components.${Component}`, [])
    .directive("tableCampers", function(){
        return {
            template: campersTable,
        }
    })
    .directive("tableAdults", function(){
        return {
            template: adultsTable,
        }
    })

exports.component = Component