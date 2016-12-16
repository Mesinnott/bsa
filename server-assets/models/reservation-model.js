let dataAdapter = require('./data-adapter')
let uuiDessert = require('./uui-dessert.js')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Reservation = DS.defineResource({
    name: 'reservation',
    endpoint: 'api/reservations',
    computed: {
        paidInFull: function() {
            DS.findAll('scout', {reservationId: this.id}).then(function(scouts) {
                var paid = true;
                for (var i = 0; i < scouts.length; i++) {
                    if (!scouts[i].paid) {
                        paid = false;
                    }
                }
                return paid;
            })
        }
    },
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
            },
            chief: {
                localField: 'chief',
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
            pack: reservation.pack || null,
            leader1: reservation.leader1,
            leader2: reservation.leader2,
            accessKey: uuiDessert.Serve(),
            goldCard: reservation.goldCard,
            paymentDate: '',
            receiptNum: '',
            paidToDate: '0',
            balance: 'FIX THIS',
            // active: true, --this functionality being transferred to individual scouts,
            // to avoid timing out partially-paid-for reservations
            paidInFull: false
        }

        Reservation.create(reservationObj).then(cb).catch(cb)
    }).catch(cb)
}

function reservationGetByAnyId(queryId, query, cb) {
    if (!cb){
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
        })
    }

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
    return Reservation.find(rewrite.id)
    .then(function (reservation) { //starting this with "return" ensures the function returns a promise without changing its function
        Reservation.update(reservation.id, rewrite).then((data) => {
            if (cb) { cb(data) } //allows us to not pass in a callback if we don't want to
        }).catch((error) => {
            if (cb) { cb(error) }
        })
    }).catch((error) => {
        if (cb) { cb(error) }
    })
}

function checkPaidStatus(id, cb) {
    Reservation.find(id).then(function (reservation) {
        DS.findAll('scout', { reservationId: reservation.id }).then(function (scoutList) {
            var paidInFull = true; // flag
            for (var i = 0; i < scoutList.length; i++) {
                if (scoutList[i].paid === false) {
                    paidInFull = false; // if any scouts unpaid, flag tripped
                }
            }
            if (reservation.paidInFull && !paidInFull) {
                reservation.init = Date.now(); // When unpaid scouts added to paid reservation, 7-day counter is reset
            }
            reservation.paidInFull = paidInFull;
            editReservation(reservation, cb); // PUT changes
        }).catch(cb)
    }).catch(cb)
}

module.exports = {
    reservationCreate,
    reservationGetByAnyId,
    editReservation,
    checkPaidStatus
}