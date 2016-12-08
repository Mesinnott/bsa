let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let 
    Year = require('./year-model'),
    User = require('./user-model'),
    Camp = require('./camp-model'),
    Pack = require('./pack-model'),
    Group = require('./group-model'),
    Scout = require('./scout-model'),
    Leader = require('./leader-model'),
    District = require('./district-model'),
    Director = require('./director-model'),
    Reservation = require('./reservation-model');

function getAnyByProp(resourceName, query, cb){
    let querySyntax = {where:{}}
    console.log(query)
    for(var thing in query){
        querySyntax.where[thing] = {}
        if(typeof query[thing]=='string'){
            query[thing] = [query[thing]]
        }
        console.error("                                         " + resourceName + "RESOURCE NAME")
        if(resourceName.includes("year")){
            query[thing] = query[thing].map(str=>parseInt(str))
        }
        querySyntax.where[thing]['in'] = query[thing]
        console.log(JSON.stringify(querySyntax))
    }
    DS.findAll(resourceName, querySyntax).then(cb).catch(cb)
}

let reservationGetByAnyId = Reservation.reservationGetByAnyId




function findYearForUpdate(resource, id, cb) {
    if (resource == 'year') {
        DS.find("Year", id).then(cb).catch(cb)
    } else {
        reservationGetByAnyId(id, {}, function (response) {
            if (response && response.length < 1) {
                response = response || [{ stack: 'something went very wrong' }];
                return cb(response)
            }
            DS.find("Year", response[0].yearId).then(cb).catch(cb); //"find" returns an array
        })
    }
}


module.exports = {
    Year,
    User,
    Camp,
    Pack,
    Group,
    Scout,
    Leader,
    District,
    Director,
    Reservation,
    getAnyByProp,
    findYearForUpdate
 }
