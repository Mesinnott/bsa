let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;

let District = DS.defineResource({
    name: 'district',
    endpoint: 'api/districts',
    relations: {
        hasMany: {
            pack: {
                localField: 'pack',
                foreignKey: 'districtId'
            },
            scout: {
                localField: 'scout',
                foreignKey: 'districtId'
            },
        }
    }
})


function districtCreate(district, cb) {
    let districtObj = {
        id: uuid.v4(),
        name: district.name,
        number: district.number
    }

    District.create(districtObj).then(cb).catch(cb)
}





function districtGetByAnyId(queryId, query, cb) {
    District.findAll({
        where: {
            'id': {
                '|===': queryId
            },
            'yearId': {
                '|===': queryId
            },
            'campId': {
                '|===': queryId
            }
        }
    }).then(cb).catch(cb)
}

function editDistrict(rewrite, cb) {
    District.find(rewrite.id).then(function (district) {
        District.update(district.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports = {
    districtCreate,
    editDistrict,
    districtGetByAnyId,
}