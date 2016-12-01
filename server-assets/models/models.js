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
Reservation = require('./reservation-model')



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
    Reservation
}