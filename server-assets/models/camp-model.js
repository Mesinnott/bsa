

let Camp = DS.defineResource({
    name: 'camp',
    endpoint: 'api/camps',
    computed: {
        getAvailability: function () {
            this.availability = this.maxScouts - this.confirmedReservations - this.pendingReservations
        }
    },
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

module.exports = {
    campGetByAnyId,
    campCreate,
    editCamp
}