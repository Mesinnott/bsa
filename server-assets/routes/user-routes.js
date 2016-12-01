const router = require('express').Router();
const User = require('../models/models').User;

module.exports.mountPath = '/users'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      User.userGetById(req.params.id, req.query.include, function (user) {
        if (user.stack) { return next(user) }
        return res.send(user)
      })
    } else {
      User.userGetAll(req.query.include, function (users) {
        if (users.stack) { return next(users) }
        return res.send(users);
      });
    }
  })
  .post(function (req, res, next) {
    User.addUser(req.body.user, function (user) {
      if (user.stack) { return next(user) }
      return res.send(user)
    })
  })
  .put(function (req, res, next) {
    User.editUser(req.params.id, req.body.user, function (user) {
      if (user.stack) { return next(user) }
      return res.send(user)
    })
  })
//   .delete(function (req, res, next) {
//     User.userDeleteById(req.body.user.id, function (user) {
//       if (user.stack) { return next(user) }
//       return res.send(user.name + ' deleted')
//     })
//   })