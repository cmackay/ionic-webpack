
'use strict';

module.exports = function ($scope) {

  $scope.list = [{
    title: 'test 1'
  }, {
    title: 'test 2'
  }];

  $scope.newTask = function () {
    $scope.list.push({
      title: 'test ' + ($scope.list.length + 1)
    });
  };
};
