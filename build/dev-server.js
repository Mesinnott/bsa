var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var opn = require('opn');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');
// MIkey added these
var routes = require('../server-assets/routes/index');
var bodyParser = require('body-parser');
var cors = require('cors');
var handlers = require('./utils/handlers');

var Models = require('../server-assets/models/models');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
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
app.use('/api',(req, res, next)=>{
  console.log('active middleware');
  Models.yearGetById(req.yearId).then(function(year) {
    var timenow = Date.now();
    if (year.lastAccess + 86400000 < timenow) {
      Models.reservationGetByAnyId(year.id).then(function(reservationList){
        reservationList.forEach(function(reservation) {
          if (reservation.init + 604800000 < timenow) {
            reservation.active = false;
            Models.editReservation(reservation.id, reservation)
          }
        })
      })
      


      year.lastAccess = timenow
      Models.editYear(year.id, year)
    }
  })


  /**
  * get a yearId and make a GET request for the date stamp
  * Compare date stamp and determine whether it's been too long
  * If it's been long enough, PUT the new date to the database.  Then,
  * compare each reservation in that year, whether it has been 7 days.  If so,
  * change the active status to false.
  */

  next()
})
app.use('/api', cors(handlers.corsOptions), routes.router)
app.use('/', handlers.defaultErrorHandler)


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
