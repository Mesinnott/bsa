const router = require('express').Router();
const Pack = require('../models/models').Pack;

module.exports.mountPath = '/packs'
module.exports.router = router;

router.route('/:id')
  .get(function (req, res, next) {
    Pack.packGetByAnyId(req.params.id, req.query.include, function (pack) {
      if (pack.stack) { return next(pack) }
      return res.send(pack)
    })
  })
  .post(function (req, res, next) {
    Pack.packCreate(req.body.pack, function (pack) {
      if (pack.stack) { return next(pack) }
      return res.send(pack)
    })
  })
  .put(function (req, res, next) {
    Pack.editPack(req.body.pack, function (pack) {
      if (pack.stack) { return next(pack) }
      return res.send(pack)
    })
  })
  .delete(function (req, res, next) {
    Pack.packDeleteById(req.body.pack.id, function (pack) {
      if (pack.stack) { return next(pack) }
      return res.send('pack' + pack.packNum + ' deleted')
    })
  })