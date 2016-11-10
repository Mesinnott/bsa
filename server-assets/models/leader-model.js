let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Leader = DS.defineResource({
    name: 'leader',
    endpoint: 'api/leaders',
    relations: {
        belongsTo: {
            reservation: {
                localField: 'reservation',
                localKey: 'reservationId',
                parent: true
            }
        }
    }
})

function create(leader, cb) {

    DS.find('reservation', leader.reservationId).then(function (reservation) {
        let leaderObj = {
            id: uuid.v4(),
            name: leader.name,
            denNum: reservation.denNum,
            reservationId: leader.reservationId,
            campId: reservation.campId,
            healthForm: false,
            paid: false,
            shirtSize: leader.shirtSize || null
        };

        Leader.create(leaderObj).then(cb).catch(cb)
    }).catch(cb)

    // let error = schemator.validateSync('Leader', leader)
    // if (error){
    //     error.stack = true
    //     return cb(error);
    // }
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
            'reservationId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}


module.exports = {
    create,
    getByAnyId
}