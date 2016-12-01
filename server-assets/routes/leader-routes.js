const router = require('express').Router();
const Models = require('../models/models')
const Leader = Models.Leader;
let anyGetByAnyId = Models.anyGetByAnyId

module.exports.mountPath = '/leaders'
module.exports.router = router;


router.route('/:id?')
  .get(function (req, res, next) {
    anyGetByAnyId("leader", req.params.id, req.query.include, function (leader) {
      if (leader.stack) { return next(leader) }
      return res.send(leader)
    })
  })
  .post(function (req, res, next) {
    Leader.leaderCreate(req.body.leader, function (leader) {
      if (leader.stack) { return next(leader) }
      return res.send(leader)
    })
  })
  .put(function (req, res, next) {
    Leader.editLeader(req.body.leader, function (leader) {
      if (leader.stack) { return next(leader) }
      return res.send(leader)
    })
  })
//   .delete(function (req, res, next) {
//     Leader.deleteById(req.body.leader.id, function (leader) {
//       if (leader.stack) { return next(leader) }
//       return res.send('leader' + leader.leaderNum + ' deleted')
//     })
//   })