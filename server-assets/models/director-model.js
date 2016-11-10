let dataAdapter = require('./data-Adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Director = DS.defineResource({
                name: 'director',
                endpoint: 'api/directors',
                relations: {
                    hasMany: {
                        camp: {
                            localField: 'camp',
                            foreignKey: 'directorId'
                        }
                    }
                }
            })

function create(director, cb){

    let directorObj = {
        id: uuid.v4(), 
        name: director.name,
        email: director.email,
        };
    // let error = schemator.validateSync('Director', director)
    // if (error){
    //     error.stack = true
    //     return cb(error);
    // }

    Director.create(directorObj).then(cb).catch(cb)
}


function getAll(query, cb){
// Use the Resource Model to get all Directors

    Director.findAll({}).then(cb).catch(cb)
}


function getByID(id, query, cb){
// use the Resource Model to get a single scout by its Id

    Director.find(id, formatQuery(query)).then(cb).catch(cb)
}


module.exports = {
    create,
    getAll,
    getByID
}