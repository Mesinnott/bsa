let uuid = require('node-uuid'),
    JsData = require('js-data'),
    // Schemator = require('js-data-schema'),
    // NeDbAdapter = require('js-data-nedb'),
    FBAdapter = require('js-data-firebase')
    // schemator = new Schemator(),
    DS = new JsData.DS();

let fbAdapter = new FBAdapter({
    // basePath: 'https://universe-simulator.firebaseio.com/'

    /////////////// THIS MUST BE CHANGED /////////////////
})

function formatQuery(query) {
    query = query || '';
    return {
        with: query.split(',').join(' ').split(' ')
    }
}

DS.registerAdapter('firebase', fbAdapter, { default: true })
//This one line tells the whole server to use Firebase as its default database.
//To change the database service, add a dependency and change this one line.

module.exports = {
    DS,
    uuid,
    // schemator,
    formatQuery
}