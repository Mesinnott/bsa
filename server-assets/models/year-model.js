let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
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
            },
            reservation: {
                localField: 'reservation',
                foreignKey: 'yearId'
            },
            scout:{
                localField:'scout',
                foreignKey: 'yearId'
            }
        }
    }
})

function yearCreate(YYYY, cb) {
    let year = {
        id: uuid.v4(),
        year: YYYY,
        lastAccess: Date.now()
    };

    Year.create(year).then(cb).catch(cb)
}


function yearGetAll(query, cb) {
    Year.findAll({}).then(cb).catch(cb)
}

function yearGetById(id, query, cb) {
    Year.find(id, formatQuery(query)).then(cb).catch(cb)
}

function editYear(rewrite, cb) {
    Year.find(rewrite.id).then(function (year) {
        Year.update(year.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

// function findYearForUpdate(resource, id, cb) {
//     if (resource == 'year') {
//         Year.find(id).then(cb).catch(cb)
//     } else {
//         Reservation.reservationGetByAnyId(id, {}, function (response) {
//             if (response && response.length < 1) {
//                 response = response || [{ stack: 'something went very wrong' }];
//                 return cb(response)
//             }
//             Year.find(response[0].yearId).then(cb).catch(cb); //"find" returns an array
//         })
//     }
// }

module.exports={
    yearCreate,
    yearGetAll,
    yearGetById,
    editYear,
}
// Removed findYearForUpdate