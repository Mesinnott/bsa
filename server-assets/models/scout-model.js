let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = datAdapter.formatQuery;


let Scout = DS.defineResource({
    name: 'scout',
    endpoint: 'api/scouts',
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


function create(scout, cb) {

    DS.find('den', scout.denId).then(function (den) {

        let scoutObj = {
            id: uuid.v4(),
            name: scout.name,
            denId: scout.denId,
            reservationId: scout.reservationId,
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


function getAll(query, cb) {
    // Use the Resource Model to get all Leaders

    Scout.findAll({}).then(cb).catch(cb)
}


function getByID(id, query, cb) {
    // use the Resource Model to get a single scout by its Id

    Scout.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getByID
}