const router = require('express').Router();
const Den = require('../models/den-model');

module.exports.mountPath = '/dens'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Den.getById(req.params.id, req.query.include, function (den) {
        if (den.stack) { return next(den) }
        return res.send(den)
      })
    } else {
      Den.getAll(req.query.include, function (dens) {
        if (dens.stack) { return next(dens) }
        return res.send(dens);
      });
    }
  })
  .post(function (req, res, next) {
    Den.create(req.body.den, function (den) {
      if (den.stack) { return next(den) }
      return res.send(den)
    })
  })
//   .put(function (req, res, next) {
//     Den.editById(req.params.id, req.body.den, function (den) {
//       if (den.stack) { return next(den) }
//       return res.send(den)
//     })
//   })
//   .delete(function (req, res, next) {
//     Den.deleteById(req.body.den.id, function (den) {
//       if (den.stack) { return next(den) }
//       return res.send(den.name + ' deleted')
//     })
//   })