let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let reservation = DS.defineResource({
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
    // Use the Resource Model to create a new star
    Reservation.create({ 
        id: uuid.v4(), 
        denId: reservation.denId, 
        campId: reservation.campId
    }).then(cb).catch(cb)
}

function getAll(query, cb) {
    //Use the Resource Model to get all Galaxies
    Reservation.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single star by its id
    Reservation.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById
}