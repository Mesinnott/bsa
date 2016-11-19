const router = require('express').Router();
const Camp = require('../models/models');

module.exports.mountPath = '/camps'
module.exports.router = router;

router.route('/:id')
  .get(function (req, res, next) {
    Camp.campGetByAnyId(req.params.id, req.query.include, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send(camp)
    })
  })
  .post(function (req, res, next) {
    Camp.campCreate(req.body.camp, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send(camp)
    })
  })
  .put(function (req, res, next) {
    Camp.editCamp(req.body.camp, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send(camp)
    })
  })
  .delete(function (req, res, next) {
    Camp.campDeleteById(req.body.camp.id, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send('camp' + camp.campNum + ' deleted')
    })
  })