const router = require('express').Router();
const Director = require('../models/director-model');

module.exports.mountPath = '/directors'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Director.getById(req.params.id, req.query.include, function (director) {
        if (director.stack) { return next(director) }
        return res.send(director)
      })
    } else {
      Director.getAll(req.query.include, function (directors) {
        if (directors.stack) { return next(directors) }
        return res.send(directors);
      });
    }
  })
  .post(function (req, res, next) {
    Director.create(req.body.director, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director)
    })
  })
  .put(function (req, res, next) {
    Director.editById(req.body.director, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director)
    })
  })
  .delete(function (req, res, next) {
    Director.deleteById(req.body.director.id, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director.name + ' deleted')
    })
  })