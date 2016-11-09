let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = datAdapter.formatQuery;



let Leader = DS.defineResource({
    name: 'leader',
    endpoint: 'api/leaders',
    relations: {
        belongsTo: {
            den: {
                localField: 'den',
                localKey: 'denId',
                parent: true
            }
        }
    }
})


function create(leader, cb) {

    DS.find('den', leader.denId).then(function (den) {
        let leaderObj = {
            id: uuid.v4(),
            name: leader.name,
            denId: leader.denId,
            reservationId: leader.reservationId,
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


function getAll(query, cb) {
    // Use the Resource Model to get all Leaders

    Leader.findAll({}).then(cb).catch(cb)
}


function getByID(id, query, cb) {
    // use the Resource Model to get a single scout by its Id

    Leader.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getByID
}