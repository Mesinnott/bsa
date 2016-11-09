const router = require('express').Router();
const Year = require('../models/year-model');

module.exports.mountPath = '/years'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Year.getById(req.params.id, req.query.include, function (year) {
        if(year.stack) { return next(year) }
        return res.send(year)
      })
    } else {
      Year.getAll(req.query.include, function (years) {
        if(years.stack) { return next(years) }
        return res.send(years);
      });
    }
  })
  .post(function (req, res, next) {
    Year.create(req.body.name, function (year) {
      if(year.stack) { return next(year) }
      return res.send(year)
    })
  })
  .put(function (req, res, next) {
    res.send('We are working on it....')
  })
  .delete(function (req, res, next) {
    res.send('We are working on it....')
  })
