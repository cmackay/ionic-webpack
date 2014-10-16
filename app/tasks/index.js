
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular

  .module('app.tasks', [
    require('../common').name
  ])

  .controller('taskList', require('./controllers/taskList'))

  .config(function ($stateProvider) {

    $stateProvider
      .state('tasks', {
        url      : '/tasks',
        abstract : true,
        template : '<ui-view/>'
      })

      .state('tasks.list', {
        url         : '',
        controller  : 'taskList',
        template    : require('./controllers/taskList.html')
      });
  })

  .run(function ($log, $window) {
    $log.debug('app.tasks module - run');
  });
