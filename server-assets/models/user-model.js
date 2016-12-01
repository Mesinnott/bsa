


let User = DS.defineResource({
    name: 'user',
    endpoint: 'api/user',
})


function addUser(user, cb) {
    let userObj = {
        id: uuid.v4(),
        name: user.name,
        email: user.email,
        admin: false,
        office: false,
        campDirector: false,
        denLeader: false
    };

    User.create(userObj).then(cb).catch(cb)
}

function userGetAll(query, cb) {
    User.findAll({}).then(cb).catch(cb)
}

function userGetById(id, query, cb) {
    User.find(id, formatQuery(query)).then(cb).catch(cb)
}

function editUser(rewrite, cb) {
    User.find(rewrite.id).then(function (user) {
        User.update(user.id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports = {
    addUser,
    userGetAll,
    userGetById,
    editUser,
}