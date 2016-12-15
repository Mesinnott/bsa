let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let Pack = DS.defineResource({
    name: 'pack',
    endpoint: 'api/packs',
    relations: {
        belongsTo: {
            district: {
                localField: 'district',
                localKey: 'districtId',
                parent: true
            }
        },
        hasMany: {
            scout: {
                localField: 'scout',
                foreignKey: 'packId'
            },
            leader: {
                localField: 'leader',
                foreignKey: 'campId'
            }
        }
    }
})


function packCreate(pack, cb) {

    Pack.create({
        id: uuid.v4(),
        number: pack.number,
        charter: pack.charter,
        districtId: pack.districtId
    }).then(cb).catch(cb)
}



function packGetByAnyId(queryId, query, cb) {
    Pack.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'districtId': {
                '|===': queryId
            },
            'scoutId': {
                '|===': queryId
            },
            'leaderId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            },
        }
    }).then(cb).catch(cb)
}

function editPack(rewrite, cb) {
    Pack.find(rewrite.id).then(function (pack) {
        Pack.update(pack.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports = {
    packCreate,
    editPack,
    packGetByAnyId
}