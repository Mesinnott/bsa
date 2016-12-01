

let Group = DS.defineResource({
    name: 'group',
    endpoint: 'api/groups',
    relations: {
         belongsTo: {
            camp: {
                localField: 'camp',
                localKey: 'campId',
                parent: true
            }
        },
        hasMany: {
            scout: {
                localField: 'scout',
                foreignKey: 'groupId'
            }
        }
    }
})

function groupCreate(color, id, cb) {
    let group = {
        id: uuid.v4(),
        campId: id,
        color: color
    };

    Group.create(group).then(cb).catch(cb)
}


function groupGetByAnyId(id, query, cb) {
    Group.find(id, formatQuery(query)).then(cb).catch(cb)
}

function editGroup(rewrite, cb) {
    Group.find(rewrite.id).then(function (group) {
        Group.update(group.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports = {
    groupCreate,
    groupGetByAnyId,
    editGroup
}