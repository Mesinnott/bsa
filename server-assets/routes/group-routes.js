const router = require('express').Router();
const Group = require('../models/group-model').Group;

module.exports.mountPath = '/groups'
module.exports.router = router;

router.route('/:id')
  .get(function (req, res, next) {
    Group.groupGetByAnyId(req.params.id, req.query.include, function (group) {
      if (group.stack) { return next(group) }
      return res.send(group)
    })
  })
  .post(function (req, res, next) {
    Group.groupCreate(req.body.group, function (group) {
      if (group.stack) { return next(group) }
      return res.send(group)
    })
  })
  .put(function (req, res, next) {
    Group.editGroup(req.body.group, function (group) {
      if (group.stack) { return next(group) }
      return res.send(group)
    })
  })