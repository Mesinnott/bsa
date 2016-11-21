// let dataAdapter = require('./data-adapter'),
//     uuid = dataAdapter.uuid,
//     // schemator = dataAdapter.schemator,
//     DS = dataAdapter.DS,
//     formatQuery = dataAdapter.formatQuery;

// let Year = DS.defineResource({
//     name: 'year',
//     endpoint: 'api/years',
//     relations: {
//         hasMany: {
//             camp: {
//                 localField: 'camp',
//                 foreignKey: 'yearId'
//             }
//         }
//     }
// })

// function create(YYYY, cb) {
//     let year = { id: uuid.v4(), year: YYYY };
    
//     Year.create(year).then(cb).catch(cb)
// }


// function getAll(query, cb) {
//     Year.findAll({}).then(cb).catch(cb)
// }

// function getById(id, query, cb) {
//     Year.find(id, formatQuery(query)).then(cb).catch(cb)
// }

// module.exports = {
//     create,
//     getAll,
//     getById
// }
