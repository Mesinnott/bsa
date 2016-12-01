let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
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
                localKey: 'reservationId'
            }
        }
    }
})

function leaderCreate(leader, cb) {
    console.log("function firing");
    DS.find('reservation', leader.reservationId).then(function (reservation) {
        let leaderObj = {
            id: uuid.v4(),
            name: leader.name,
            packNum: reservation.packNum,
            packId: reservation.packId,
            reservationId: reservation.id,
            campId: reservation.campId,
            yearId: reservation.yearId,
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

function leaderGetByAnyId(queryId, query, cb) {
    console.log(query)
    console.log("QUERY")
    Leader.findAll(formatQuery(query)).then(cb).catch(cb)
}

function editLeader(rewrite, cb) {
    Leader.find(rewrite.id).then(function (leader) {
        Leader.update(leader.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports={
    leaderCreate,
    leaderGetByAnyId,
    editLeader,
}