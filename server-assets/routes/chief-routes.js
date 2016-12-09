const router = require('express').Router();
const Models = require('../models/models')
const Chief = Models.Chief;
let anyGetByAnyId = Models.anyGetByAnyId

module.exports.mountPath = '/chiefs'
module.exports.router = router;


router.route('/:id?')
  .get(function (req, res, next) {
    anyGetByAnyId("chief", req.params.id, req.query.include, function (chief) {
      if (chief.stack) { return next(chief) }
      return res.send(chief)
    })
  })
  .post(function (req, res, next) {
    Chief.chiefCreate(req.body.chief, function (chief) {
      if (chief.stack) { return next(chief) }
      return res.send(chief)
    })
  })
  .put(function (req, res, next) {
    Chief.editChief(req.body.chief, function (chief) {
      if (chief.stack) { return next(chief) }
      return res.send(chief)
    })
  })
//   .delete(function (req, res, next) {
//     Chief.deleteById(req.body.chief.id, function (chief) {
//       if (chief.stack) { return next(chief) }
//       return res.send('chief' + chief.chiefNum + ' deleted')
//     })
//   })