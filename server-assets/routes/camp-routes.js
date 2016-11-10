const router = require('express').Router();
const Camp = require('../models/camp-model');

module.exports.mountPath = '/camps'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Camp.getByAnyId(req.params.id, req.query.include, function (camp) {
        if (camp.stack) { return next(camp) }
        return res.send(camp)
      })
    }
  })
  .post(function (req, res, next) {
    Camp.create(req.body.camp, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send(camp)
    })
  })
  .put(function (req, res, next) {
    Camp.editById(req.body.camp, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send(camp)
    })
  })
  .delete(function (req, res, next) {
    Camp.deleteById(req.body.camp.id, function (camp) {
      if (camp.stack) { return next(camp) }
      return res.send('camp' + camp.campNum + ' deleted')
    })
  })