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
    Chief = require('./chief-model'),
    Group = require('./group-model'),
    Scout = require('./scout-model'),
    Leader = require('./leader-model'),
    District = require('./district-model'),
    Director = require('./director-model'),
    Reservation = require('./reservation-model');

function getAnyByProp(resourceName, query, cb){
    let args = [resourceName]
    let querySyntax = {};
    let includeSyntax = {};
    let include = query.with || ''
    delete query.with
    // console.log("Query of" + JSON.stringify(query))
    if(!!Object.keys(query).length){ // if the query is not blank
        querySyntax = {where:{}}
        // console.log("Query is not blank")
        for(var thing in query){
            querySyntax.where[thing] = {}
            if(typeof query[thing]=='string'){
                if(query[thing]=="true"){
                    query[thing] = true;
                }else if(query[thing]=="false"){
                    query[thing] = false;
                }
                query[thing] = [query[thing]]
            }
            // console.log(resourceName + "is current resource")
            if(resourceName.includes("year")){
                query[thing] = query[thing].map(str=>parseInt(str))
            }
            querySyntax.where[thing]['in'] = query[thing]
            // console.log(JSON.stringify(querySyntax))
            args.push(querySyntax)
        }
    }
    let w = formatQuery(include).with;
    if(!!w[0]){
        // console.log(w)
        includeSyntax.with = w
        args.push(includeSyntax)
    }
    // console.log(JSON.stringify(querySyntax))
    // console.log(JSON.stringify(args))
    if(!cb) return DS.findAll(...args); // Returns Promise if no callback

    DS.findAll(...args).then(cb).catch(cb)
}

let reservationGetByAnyId = Reservation.reservationGetByAnyId




function findYearForUpdate(resource, id, cb) {
    if (resource == 'year') {
        DS.find("year", id).then(cb).catch(cb)
    } else {
        Reservation.reservationGetByAnyId(id, {}, function (response) {
            if (response && response.length < 1) {
                response = response || [{ stack: 'something went very wrong' }];
                return cb(response)
            }
            DS.find("year", response[0].yearId).then(cb).catch(cb); //"find" returns an array
        })
    }
}


module.exports = {
    Year,
    User,
    Camp,
    Pack,
    Chief,
    Group,
    Scout,
    Leader,
    District,
    Director,
    Reservation,
    getAnyByProp,
    findYearForUpdate
 }
