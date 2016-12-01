const router = require('express').Router();
const Scout = require('../models/models').Scout;

module.exports.mountPath = '/scouts'
module.exports.router = router;

router.route('/:id')
  .get(function (req, res, next) {
    Scout.scoutGetByAnyId(req.params.id, req.query.include, function (scout) {
      if (scout.stack) { return next(scout) }
      return res.send(scout)
    })
  })
  .post(function (req, res, next) {
    Scout.scoutCreate(req.body.scout, function (scout) {
      if (scout.stack) { return next(scout) }
      return res.send(scout)
    })
  })
  .put(function (req, res, next) {
    Scout.editScout(req.body.scout, function (scout) {
      if (scout.stack) { return next(scout) }
      return res.send(scout)
    })
  })
//   .delete(function (req, res, next) {
//     Scout.deleteById(req.body.scout.id, function (scout) {
//       if (scout.stack) { return next(scout) }
//       return res.send('scout' + scout.scoutNum + ' deleted')
//     })
//   })