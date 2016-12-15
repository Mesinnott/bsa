let dataAdapter = require('./data-adapter')
let uuid = dataAdapter.uuid,
    // schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    formatQuery = dataAdapter.formatQuery;


let User = DS.defineResource({
    name: 'user',
    endpoint: 'api/users',
})


function addUser(user, cb) {
    let userObj = {
        // id: uuid.v4(),
        displayName: user.name,
        email: user.email,
        admin: false,
        super: false,
        director: false,
        reservation: false, 
        reservationId: 'none'
    };

    User.create(userObj).then(cb).catch(cb)
}

function userGetAll(query, cb) {
    User.findAll({}).then(cb).catch(cb)
}

function userGetById(id, query, cb) {
    User.find(id, formatQuery(query)).then(cb).catch(cb)
}

function editUser(id, rewrite, cb) {  
    User.find(id).then(function (user) {
        User.update(id, rewrite).then(cb).catch(cb)
    }).catch(cb)
}

module.exports = {
    addUser,
    userGetAll,
    userGetById,
    editUser,
}