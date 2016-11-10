let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;


let Scout = DS.defineResource({
    name: 'scout',
    endpoint: 'api/scouts',
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


function create(scout, cb) {

    DS.find('reservation', scout.reservationId).then(function (reservation) {

        let scoutObj = {
            id: uuid.v4(),
            name: scout.name,
            denNum: reservation.denNum,
            reservationId: reservation.id,
            campId: reservation.campId,
            healthForm: false,
            paid: false,
            shirtSize: scout.shirtSize
        };
        // let error = schemator.validateSync('Scout', scout)
        // if (error){
        //     error.stack = true
        //     return cb(error);
        // }
        Scout.create(scoutObj).then(cb).catch(cb)
    }).catch(cb)
}



function getByAnyId(queryId, query, cb) {
    Scout.findAll({
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