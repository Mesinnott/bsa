let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
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
            },
            group: {
                localField: 'group',
                localKey: 'groupId',
                parent: true
            }
        }
    }
})


function scoutCreate(scout, cb) {
    console.log('ds.find reservation')
    DS.find('reservation', scout.reservationId).then(function (reservation) {
        console.log('DID WE GET HERE????', reservation)
        let scoutObj = {
            id: uuid.v4(),
            name: scout.name,
            packNum: reservation.packNum,
            packId: reservation.packId,
            reservationId: reservation.id,
            campId: reservation.campId,
            yearId: reservation.yearId,
            healthForm: false,
            paid: false,
            shirtSize: scout.shirtSize,
            active:true,
        };
        // let error = schemator.validateSync('Scout', scout)
        // if (error){
        //     error.stack = true
        //     return cb(error);
        // }
        Scout.create(scoutObj).then(cb).catch(cb)
    }).catch(cb)
}



function scoutGetByAnyId(queryId, query, cb) {
    if(!!cb){
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
                },
                'packId': {
                    '|===': queryId
                },
            }
        }).then(cb).catch(cb)
        return
    }
    return Scout.findAll({
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
            },
            'packId': {
                '|===': queryId
            },
        }
    })

}

function editScout(rewrite, cb) {
    if(cb){
        Scout.find(rewrite.id)
        .then(function (scout) {
            Scout.update(scout.id, rewrite)
            .then((data) => {
                cb(data)
                DS.update("reservation", scout.reservationId, {init: Date.now()}) 
            }).catch((error) => {
                cb(error)
            })
        })
        return;
    }
    // Scout.find(rewrite.id).then(function (scout) {
    //     Scout.update(scout.id, rewrite).then((data) => {
    //         Models.Reservation.checkPaidStatus(scout.reservationId, cb);
    //         if (cb) { cb(data) }
    //     }).catch((error) => {
    //         if (cb) { cb(error) }
    //     })
    //     return
    // }
    // }
    return Scout.find(rewrite.id)
        .then(
            function (scout) {
                return Scout.update(scout.id, rewrite)
        })            
}

module.exports = {
    scoutCreate,
    scoutGetByAnyId,
    editScout,
}