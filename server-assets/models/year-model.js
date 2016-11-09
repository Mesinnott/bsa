let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Year = DS.defineResource({
    name: 'year',
    endpoint: 'api/years',
    relations: {
        hasMany: {
            camp: {
                localField: 'camp',
                foreignKey: 'yearId'
            }
        }
    }
})

function create(date, cb) {
    // Use the Resource Model to create a new planet
    let year = { id: uuid.v4(), year: date };
    
    Year.create(year).then(cb).catch(cb)
}


function getAll(query, cb) {
    //Use the Resource Model to get all Galaxies
    Year.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
    // use the Resource Model to get a single star by its id
    Year.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
    create,
    getAll,
    getById
}
