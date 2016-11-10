let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Reservation = DS.defineResource({
    name: 'reservation',
    endpoint: 'api/reservations',
    relations: {
        belongsTo: {
            camp: {
                localField: 'camp',
                localKey: 'campId'
            }
        },
        hasMany: {
            scout: {
                localField: 'scout',
                foreignKey: 'reservationId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'denId'
            }
        },
        hasOne: {
            den: {
                localField: 'den',
                localKey: 'denId'
            },
        }
    }
})


function create(reservation, cb) {
    
    DS.find('camp', reservation.campId).then(function(camp) {
        let reservationObj = {
            id: uuid.v4(), 
            denNum: reservation.denNum, 
            campId: reservation.campId,
            yearId: camp.yearId,
            date: camp.date,
            campNum: camp.campNum,
            location: camp.location,
            scoutLevels: camp.scoutLevels
        }

        Reservation.create(reservationObj).then(cb).catch(cb)
    }).catch(cb)
}

function getByAnyId(queryId, query, cb) {
    Reservation.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            },
            'denId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

module.exports = {
    create,
    getByAnyId
}