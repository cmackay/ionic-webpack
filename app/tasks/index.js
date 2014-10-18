
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular

  .module('app.tasks', [
    require('../common/libs').name
  ])

  .config(require('./states'))

  .run(function ($log, $window) {
    $log.debug('app.tasks module - run');
  });
