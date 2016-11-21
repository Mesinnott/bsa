const router = require('express').Router();
const Director = require('../models/models');

module.exports.mountPath = '/directors'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Director.directorGetById(req.params.id, req.query.include, function (director) {
        if (director.stack) { return next(director) }
        return res.send(director)
      })
    } else {
      Director.directorGetAll(req.query.include, function (directors) {
        if (directors.stack) { return next(directors) }
        return res.send(directors);
      });
    }
  })
  .post(function (req, res, next) {
    Director.directorCreate(req.body.director, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director)
    })
  })
  .put(function (req, res, next) {
    Director.directorEditById(req.params.id, req.body.director, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director)
    })
  })
  .delete(function (req, res, next) {
    Director.directorDeleteById(req.body.director.id, function (director) {
      if (director.stack) { return next(director) }
      return res.send(director.name + ' deleted')
    })
  })