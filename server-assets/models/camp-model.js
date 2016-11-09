let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Camp = DS.defineResource({
    name: 'camp',
    endpoint: 'api/camps',
    relations: {
        belongsTo: {
            year: {
                localField: 'year',
                localKey: 'yearId',
                parent: true
            }
        },
        hasOne: {
            director: {
                localField: 'director',
                localKey: 'directorId'
            }
        },
        hasMany: {
            reservation: {
                localField: 'reservation',
                foreignKey: 'campId'
            },
            scout: {
                localField: 'scout',
                foreignKey: 'campId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'campId'
            }
        }
    }
})


function create(camp, cb) {
    
    Camp.create({ 
        id: uuid.v4(), 
        campNum: camp.campNum,
        yearId: camp.yearId,
        location: camp.location,
        date: camp.date,                /////May want to redo these ones based on the front end input for 
        endDate: camp.endDate || null,  /////the cub/webelos camp date selectors.
        weekdays: camp.weekdays,        /////Use momentJS to determine days of week?
        directorId: camp.directorId,
        startTime: camp.startTime,
        endTime: camp.endTime,
        scoutLevels: camp.scoutLevels
    }).then(cb).catch(cb)
}

function getAll(query, cb) {
    //Use the Resource Model to get all Galaxies
    Camp.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single star by its id
    Camp.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById
}