const router = require('express').Router();
const Leader = require('../models/models');

module.exports.mountPath = '/leaders'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Leader.leaderGetByAnyId(req.params.id, req.query.include, function (leader) {
        if (leader.stack) { return next(leader) }
        return res.send(leader)
      })
    }
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