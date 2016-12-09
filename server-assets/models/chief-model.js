let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Chief = DS.defineResource({
    name: 'chief',
    endpoint: 'api/chiefs',
    relations: {
        belongsTo: {
            reservation: {
                localField: 'reservation',
                localKey: 'reservationId'
            }
        }
    }
})

function chiefCreate(chief, cb) {
    console.log("function firing");
    DS.find('reservation', chief.reservationId).then(function (reservation) {
        let chiefObj = {
            id: uuid.v4(),
            name: chief.name,
            packNum: reservation.packNum,
            packId: reservation.packId,
            reservationId: reservation.id,
            campId: reservation.campId,
            yearId: reservation.yearId,
            healthForm: false,
            paid: false,
            shirtSize: chief.shirtSize || null
        };

        Chief.create(chiefObj).then(cb).catch(cb)
    }).catch(cb)

    // let error = schemator.validateSync('Chief', chief)
    // if (error){
    //     error.stack = true
    //     return cb(error);
    // }
}

function chiefGetByAnyId(queryId, query, cb) {
    console.log(query)
    console.log("QUERY")
    Chief.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}



function editChief(rewrite, cb) {
    Chief.find(rewrite.id).then(function (chief) {
        Chief.update(chief.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports={
    chiefCreate,
    chiefGetByAnyId,
    editChief,
}