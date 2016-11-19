let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;





let Camp = DS.defineResource({
    name: 'camp',
    endpoint: 'api/camps',
    relations: {
        belongsTo: {
            year: {
                localField: 'year',
                localKey: 'yearId',
                parent: true
            }
        },
        hasOne: {
            director: {
                localField: 'director',
                localKey: 'directorId'
            }
        },
        hasMany: {
            reservation: {
                localField: 'reservation',
                foreignKey: 'campId'
            },
            scout: {
                localField: 'scout',
                foreignKey: 'campId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'campId'
            }
        }
    }
})


function campCreate(camp, cb) {

    Camp.create({
        id: uuid.v4(),
        campNum: camp.campNum,
        yearId: camp.yearId,
        location: camp.location,
        date: camp.date,                /////May want to redo these ones based on the front end input for 
        endDate: camp.endDate || null,  /////the cub/webelos camp date selectors.
        weekdays: camp.weekdays,        /////Use momentJS to determine days of week?
        directorId: camp.directorId,
        startTime: camp.startTime,
        endTime: camp.endTime,
        scoutLevels: camp.scoutLevels,
        maxScouts: camp.maxScouts,
        confirmedReservations: 0,
        pendingReservations: 0
    }).then(cb).catch(cb)
}

function campGetByAnyId(queryId, query, cb) {
    Camp.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'directorId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

function editCamp(rewrite, cb) {
    Camp.find(rewrite.id).then(function (camp) {
        Camp.update(camp.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}


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

function directorCreate(director, cb) {

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


function directorGetAll(query, cb) {
    // Use the Resource Model to get all Directors

    Director.findAll({}).then(cb).catch(cb)
}


function directorGetById(id, query, cb) {
    // use the Resource Model to get a single scout by its Id

    Director.find(id, formatQuery(query)).then(cb).catch(cb)
}

function directorEditById(directorId, input, cb) {
    // NOTE----- to edit, you must put in a correct name and email************8

    let newName = input.name
    let newEmail = input.email


    Director.find(directorId).then(function (director) {
        director.name = newName
        director.email = newEmail

        Director.update(director.id, director)
            .then(cb)
            .catch(cb)
    }).catch(cb)
}




let Leader = DS.defineResource({
    name: 'leader',
    endpoint: 'api/leaders',
    relations: {
        belongsTo: {
            reservation: {
                localField: 'reservation',
                localKey: 'reservationId'
            }
        }
    }
})

function leaderCreate(leader, cb) {
    console.log("function firing");
    DS.find('reservation', leader.reservationId).then(function (reservation) {
        let leaderObj = {
            id: uuid.v4(),
            name: leader.name,
            denNum: reservation.denNum,
            reservationId: reservation.id,
            campId: reservation.campId,
            yearId: reservation.yearId,
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

function leaderGetByAnyId(queryId, query, cb) {
    Leader.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            },
            'reservationId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

function editLeader(rewrite, cb) {
    Leader.find(rewrite.id).then(function (leader) {
        Leader.update(leader.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}



let Reservation = DS.defineResource({
    name: 'reservation',
    endpoint: 'api/reservations',
    relations: {
        belongsTo: {
            camp: {
                localField: 'camp',
                localKey: 'campId'
            }
        },
        hasMany: {
            scout: {
                localField: 'scout',
                foreignKey: 'reservationId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'reservationId'
            }
        }
    }
})


function reservationCreate(reservation, cb) {

    DS.find('camp', reservation.campId).then(function (camp) {
        let reservationObj = {
            id: uuid.v4(),
            denNum: reservation.denNum,
            campId: reservation.campId,
            yearId: camp.yearId,
            date: camp.date,
            campNum: camp.campNum,
            location: camp.location,
            scoutLevels: camp.scoutLevels,
            email: reservation.email,
            init: Date.now(),
            active: true,
            paidInFull: false
        }

        Reservation.create(reservationObj).then(cb).catch(cb)
    }).catch(cb)
}

function reservationGetByAnyId(queryId, query, cb) {
    return Reservation.findAll({ //starting this with "return" ensures the function returns a promise without changing its function
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            },
        }
    }).then(cb).catch(cb)
}

function editReservation(rewrite, cb) {
    return Reservation.find(rewrite.id).then(function (reservation) { //starting this with "return" ensures the function returns a promise without changing its function
        Reservation.update(reservation.id, rewrite).then((data) => {
            if (cb) { cb(data) } //allows us to not pass in a callback if we don't want to
        }).catch((error) => {
            if (cb) { cb(error) }
        })
    }).catch((error) => {
        if (cb) { cb(error) }
    })
}




let Scout = DS.defineResource({
    name: 'scout',
    endpoint: 'api/scouts',
    relations: {
        belongsTo: {
            reservation: {
                localField: 'reservation',
                localKey: 'reservationId',
                parent: true
            }
        }
    }
})


function scoutCreate(scout, cb) {
    console.log('ds.find reservation')
    DS.find('reservation', scout.reservationId).then(function (reservation) {
        console.log('DID WE GET HERE????', reservation)
        let scoutObj = {
            id: uuid.v4(),
            name: scout.name,
            denNum: reservation.denNum,
            reservationId: reservation.id,
            campId: reservation.campId,
            yearId: reservation.yearId,
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



function scoutGetByAnyId(queryId, query, cb) {
    Scout.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            },
            'reservationId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

function editScout(rewrite, cb) {
    Scout.find(rewrite.id).then(function (scout) {
        Scout.update(scout.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}


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

function findYearForUpdate(resource, id, cb) {
    if (resource == 'year') {
        Year.find(id).then(cb).catch(cb)
    } else {
        reservationGetByAnyId(id, {}, function (response) {
            if(response && response.length < 1){
                response = response || [{stack: 'something went very wrong'}];
                return cb(response)
            }
            Year.find(response[0].yearId).then(cb).catch(cb); //"find" returns an array
        })
    }
}


module.exports = {
    campGetByAnyId,
    campCreate,
    editCamp,
    directorCreate,
    directorGetAll,
    directorGetById,
    directorEditById,
    leaderCreate,
    leaderGetByAnyId,
    editLeader,
    reservationCreate,
    reservationGetByAnyId,
    editReservation,
    scoutCreate,
    scoutGetByAnyId,
    editScout,
    yearCreate,
    yearGetAll,
    yearGetById,
    editYear,
    findYearForUpdate
}