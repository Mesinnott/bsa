const router = require('express').Router();
const Reservation = require('../models/reservation-model');

module.exports.mountPath = '/reservations'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Reservation.getByAnyId(req.params.id, req.query.include, function (reservation) {
        if (reservation.stack) { return next(reservation) }
        return res.send(reservation)
      })
    }
  })
  .post(function (req, res, next) {
    Reservation.create(req.body.reservation, function (reservation) {
      if (reservation.stack) { return next(reservation) }
      return res.send(reservation)
    })
  })
//   .put(function (req, res, next) {
//     Reservation.editById(req.body.reservation, function (reservation) {
//       if (reservation.stack) { return next(reservation) }
//       return res.send(reservation)
//     })
//   })
//   .delete(function (req, res, next) {
//     Reservation.deleteById(req.body.reservation.id, function (reservation) {
//       if (reservation.stack) { return next(reservation) }
//       return res.send('reservation' + reservation.reservationNum + ' deleted')
//     })
//   })