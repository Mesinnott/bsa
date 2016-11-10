const router = require('express').Router();
const Camp = require('../models/camp-model');

module.exports.mountPath = '/camps'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Camp.getById(req.params.id, req.query.include, function (camp) {
        if (camp.stack) { return next(camp) }
        return res.send(camp)
      })
    } else {
      Camp.getByYearId(req.query.include, function (camps) {
        if (camps.stack) { return next(camps) }
        return res.send(camps);
      });
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