// let dataAdapter = require('./data-adapter')
// let uuid = dataAdapter.uuid,
//     // schemator = dataAdapter.schemator,
//     DS = dataAdapter.DS,
//     formatQuery = dataAdapter.formatQuery;

// let Director = DS.defineResource({
//     name: 'director',
//     endpoint: 'api/directors',
//     relations: {
//         hasMany: {
//             camp: {
//                 localField: 'camp',
//                 foreignKey: 'directorId'
//             }
//         }
//     }
// })

// function directorCreate(director, cb) {

//     let directorObj = {
//         id: uuid.v4(),
//         name: director.name,
//         email: director.email,
//     };
//     // let error = schemator.validateSync('Director', director)
//     // if (error){
//     //     error.stack = true
//     //     return cb(error);
//     // }

//     Director.create(directorObj).then(cb).catch(cb)
// }


// function directorGetAll(query, cb) {
//     // Use the Resource Model to get all Directors

//     Director.findAll({}).then(cb).catch(cb)
// }


// function directorGetById(id, query, cb) {
//     // use the Resource Model to get a single scout by its Id

//     Director.find(id, formatQuery(query)).then(cb).catch(cb)
// }

// function directorEditById(directorId, input, cb) {
//     // NOTE----- to edit, you must put in a correct name and email************8

//     let newName = input.name
//     let newEmail = input.email


//     Director.find(directorId).then(function (director) {
//         director.name = newName
//         director.email = newEmail

//         Director.update(director.id, director)
//             .then(cb)
//             .catch(cb)
//     }).catch(cb)
// }


// module.exports = {
//     directorCreate,
//     directorGetAll,
//     directorGetById,
//     directorEditById,
// }