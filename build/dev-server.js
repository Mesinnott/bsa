var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var opn = require('opn');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');
// Mikey added these
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

app.use('/api', (req, res, next) => {
  console.log('active middleware');
  console.log(req.url);

  var urls = req.url.split('/') // Have to get the params straight from the url
  var resource = urls[1].slice(0, -1) // Slice off the "s"
  var id = urls[2]

  if (resource == 'director' || !id) { // Isn't attached to any yearId
    next(); // MUST CALL NEXT in every eventuality
    return;
  }

  Models.findYearForUpdate(resource, id, function (year) {
    if (year.stack) { return next() }  //If there's an error, don't bother going on

    var timenow = Date.now();
    if (year.lastAccess + 86400000 < timenow || !year.lastAccess) { // 24 hours

      year.lastAccess = timenow

      Models.Year.editYear(year, () => { // Pass in the following as a callback
        Models.Reservation.reservationGetByAnyId(year.id).then(function (reservationList) {
          reservationList.forEach(function (reservation) {  // Is there a problem using forEach here? Ask Jake.
            if (reservation.init + 604800000 < timenow && reservation.paidInFull === false) { // 7 days old and not paid in full
              Models.Scout.scoutGetByAnyId(reservation.id, reservation, function (scouts) { // To find unpaid-for scouts
                Promise.all(scouts.filter(function (scout) { // Promise.all ensures all promises have returned before the code moves on
                  if (!scout.paid) { // Kick them off reservation without disturbing paid-for packmates
                    scout.reservationId = null;
                    scout.campId = null;
                    return Models.Scout.editScout(scout)
                  }
                })).then((data) => {
                  console.log(data);
                  next();
                })
              })
            }
          })
        }).catch((error) => {
          console.log(error);
          next();
        })
      })
    } else { next() } // every endpoint of this function MUST run next()
  })
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
  // opn(uri)
})
