let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = datAdapter.formatQuery;


let Den = DS.defineResource({
    name: 'den',
    endpoint: 'api/dens',
    relations: {
        hasMany: {
            scout: {
                localField: 'scout',
                foreignKey: 'denId'
            },
            camp: {
                localField: 'camp',
                foreignKey: 'denId'
            },
            reservation: {
                localField: 'reservation',
                foreignKey: 'denId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'denId'
            }
        }
    }
})

function create(den, cb) {

    DS.find('reservation', den.reservationId).then(function (reservation) {

        let denObj = {
            id: uuid.v4(),
            name: name,
            size: 2,
            reservation: den.reservationId
        };



    Den.create(denObj).then(cb).catch(cb)
    }).catch(cb)

    // let error = schemator.validateSync('Den', den)
    // if (error){
    //     error.stack = true
    //     return cb(error);
    // }

}


function getAll(query, cb) {
    // Use the Resource Model to get all Dens

    Den.findAll({}).then(cb).catch(cb)
}


function getByID(id, query, cb) {
    // use the Resource Model to get a single scout by its Id

    Den.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getByID
}