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

function getByAnyId(queryId, query, cb) {
    Camp.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'directorId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

module.exports = {
    create,
    getByAnyId
}