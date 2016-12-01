; (function () {
  const Models = require('../models/models'),
      getAnyByProp = Models.getAnyByProp
  const fs = require('fs');
  const path = require('path');
  
  let router = require('express').Router();
  router.route('/:resourceName/:id?')
    .get(function (req, res, next) {
      if(req.query && !req.params.id){
        let resourceName = req.params.resourceName.split('')
        resourceName.pop()
        resourceName = resourceName.join('')
        getAnyByProp(resourceName, req.query, function(camp){
          if (camp.stack) { return next(camp) }
          return res.send(camp)
        })
        return;
      }
    })
  exports.router = router

  let files = fs.readdirSync(__dirname);

  files.forEach(function (file) {

    if (!file.endsWith('.js')) return;
    if (file.endsWith('index.js')) return;

    let controller = require('./' + file);

    if (!controller.router) return;

    exports.router.use(controller.mountPath || '', controller.router);
  });

} ());