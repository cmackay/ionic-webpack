
'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
    .state('tasks', {
      url      : '/tasks',
      abstract : true,
      template : '<ui-view/>'
    })

    .state('tasks.list', {
      url         : '',
      controller  : require('./controllers/taskList'),
      template    : require('./controllers/taskList.html')
    })

    .state('tasks.reports', {
      url         : '/reports',
      controller  : require('./controllers/taskReports'),
      template    : require('./controllers/taskReports.html')
    });
}
