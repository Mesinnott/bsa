var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('../config'),
    opn = require('opn'),
    proxyMiddleware = require('http-proxy-middleware'),
    webpackConfig = require('./webpack.dev.conf'),
    // Mikey added these
    routes = require('../server-assets/routes/index'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    handlers = require('./utils/handlers'),
    customWare = require('./custom-middleware'),

    // default port where dev server listens for incoming traffic
    port = process.env.PORT || config.dev.port,
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable = config.dev.proxyTable,

    app = express(),
    compiler = webpack(webpackConfig),

    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }),

    hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
})



// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))
// Mikey added this in
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/', express.static('./'))

app.use(...customWare.expireReservations)




                        
        //                 for (var i = 0; i < reservationList.length; i++) {
        //                     var reservation = reservationList[i];
        //                     if (reservation.init + timeout < timenow && !reservation.paidInFull) {
        //                         Models.Scout.scoutGetByAnyId(reservation.id).then(function (scouts) {
        //                             Promise.all(function (scouts) {
        //                                 for (var j = 0; j < scouts.length; j++) {
        //                                     var scout = scouts[i];
        //                                     if (!scout.paid) {
        //                                         scout.reservationId = null;
        //                                         scout.campId = null;
        //                                         Models.Scout.editScout(scout)
        //                                     }
        //                                 }
        //                             })
        //                         }).then
        //                     }
        //                 }
        //             }).then(function () { return next() }).catch(function () { return next() })
            // }


//     Models.findYearForUpdate(resource, id, function (year) {
//         if (year.stack) { return next() }  //If there's an error, don't bother going on
//         let frequency = 86400000; // 24hrs
//         let timeout = 604800000; // 7days
//         var timenow = Date.now();
//         if (year.lastAccess + frequency < timenow || !year.lastAccess) { // 24 hours
//             year.lastAccess = timenow
//             Models.Year.editYear(year, () => { // Pass in the following as a callback
//                 Models.Reservation.reservationGetByAnyId(year.id).then(function (reservationList) {

//                     reservationList.forEach(function (reservation) {
//                         // Is there a problem using forEach here? Ask Jake.
//                         if (reservation.init + timeout < timenow && reservation.paidInFull === false) { // 7 days old and not paid in full

//                             Models.Scout.scoutGetByAnyId(reservation.id, reservation, function (scouts) { // To find unpaid-for scouts

//                                 Promise.all(scouts.filter(function (scout) { // Promise.all ensures all promises have returned before the code moves on

//                                     if (!scout.paid) { // Kick them off reservation without disturbing paid-for packmates
//                                         scout.reservationId = null;
//                                         scout.campId = null;
//                                         return Models.Scout.editScout(scout)
//                                     }
//                                 })).then((data) => {
//                                     console.log(data);
//                                     next();
//                                 })
//                             })
//                         }
//                     })
//                 }).catch((error) => {
//                     console.log(error);
//                     next();
//                 })
//             })
//         } else { next() } // every endpoint of this function MUST run next()
//     })
// })

// Models.editYear(year, ()=>{ // Pass in the following as a callback
//   Models.Reservation.reservationGetByAnyId(year.id).then(function (reservationList) {
//     Promise.all(reservationList.filter(function (reservation) { //Promise.all ensures all promises have returned before the code moves on
//       if (reservation.init + 604800000 < timenow && reservation.paidInFull === false) { // 7 days and not paid in full
//         Models.Scout.scoutGetByAnyId(reservation.id, reservation, function(scouts) { // find unpaid scouts
//           Promise.all(scouts.filter(function(scout) { // duplicating above construction
//             if (!scout.paid) { //Kick them off reservation without disturbing paid-for packmates
//               scout.reservationId = null;
//               scout.campId = null;
//               return Models.Scout.editScout(scout)
//             }
//           }))
//         })


//         reservation.active = false;
//         return Models.editReservation(reservation)
//       }
//     })).then((data)=>{
//       console.log(data)
//       next()
//     })
//   }).catch((error)=>{
//     console.log(error)
//     next()
//   })
// })
//     }


//     else{ next() } // every endpoint of this function MUST run next()
//   })
// })
// }
// }
app.use('/api', cors(handlers.corsOptions), routes.router)
app.use('/', handlers.defaultErrorHandler)


module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
    // opn(uri)

})


