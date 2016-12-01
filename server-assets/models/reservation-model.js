let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
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
                foreignKey: 'reservationId'
            }
        }
    }
})


function reservationCreate(reservation, cb) {

    DS.find('camp', reservation.campId).then(function (camp) {
        let reservationObj = {
            id: uuid.v4(),
            packNum: reservation.packNum,
            packId: reservation.packId,
            campId: reservation.campId,
            yearId: camp.yearId,
            date: camp.date,
            campNum: camp.campNum,
            location: camp.location,
            scoutLevels: camp.scoutLevels,
            email: reservation.email,
            init: Date.now(),
            pack: reservation.pack,
            active: true,
            paidInFull: false
        }

        Reservation.create(reservationObj).then(cb).catch(cb)
    }).catch(cb)
}

function reservationGetByAnyId(queryId, query, cb) {
    return Reservation.findAll({ //starting this with "return" ensures the function returns a promise without changing its function
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
        }
    }).then(cb).catch(cb)
}

function editReservation(rewrite, cb) {
    return Reservation.find(rewrite.id).then(function (reservation) { //starting this with "return" ensures the function returns a promise without changing its function
        Reservation.update(reservation.id, rewrite).then((data) => {
            if (cb) { cb(data) } //allows us to not pass in a callback if we don't want to
        }).catch((error) => {
            if (cb) { cb(error) }
        })
    }).catch((error) => {
        if (cb) { cb(error) }
    })
}

module.exports = {
    reservationCreate,
    reservationGetByAnyId,
    editReservation,
}