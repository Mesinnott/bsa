const router = require('express').Router();
const Models = require('../models/models'),
      Year = Models.Year,
      getAnyByProp = Models.getAnyByProp

module.exports.mountPath = '/years'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Year.yearGetById(req.params.id, req.query.include, function (year) {
        if(year.stack) { return next(year) }
        return res.send(year)
      })
    } else if(req.query.year){
      Year.yearGetByYear(req.query.year, req.query.include, function (year){
        if(year.stack){return next(year)}
        return res.send(year)
      })
    
    }else{
      Year.yearGetAll(req.query.include, function (years) {
        if(years.stack) { return next(years) }
        return res.send(years);
      });
    }
  })
  .post(function (req, res, next) {
    Year.yearCreate(req.body.year, function (year) {
      if(year.stack) { return next(year) }
      return res.send(year)
    })
  })
  .put(function (req, res, next) {
    Year.editYear(req.body.year, function (year) {
      if (year.stack) { return next(year) }
      return res.send(year)
    })
  })