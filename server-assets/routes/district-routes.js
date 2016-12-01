const router = require('express').Router();
const District = require('../models/models').District;

module.exports.mountPath = '/districts'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    District.districtGetByAnyId(req.params.id, req.query.include, function (district) {
      if (district.stack) { return next(district) }
      return res.send(district)
    })
  })
  .post(function (req, res, next) {
    District.districtCreate(req.body.district, function (district) {
      if (district.stack) { return next(district) }
      return res.send(district)
    })
  })
  .put(function (req, res, next) {
    District.editDistrict(req.body.district, function (district) {
      if (district.stack) { return next(district) }
      return res.send(district)
    })
  })
  .delete(function (req, res, next) {
    District.districtDeleteById(req.body.district.id, function (district) {
      if (district.stack) { return next(district) }
      return res.send('district' + district.districtNum + ' deleted')
    })
  })