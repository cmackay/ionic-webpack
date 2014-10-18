
'use strict';

module.exports = function ($scope) {

  $scope.title = 'My List';

  $scope.list = [{
    title: 'item 1'
  }, {
    title: 'item 2'
  }];

  $scope.newTask = function () {
    $scope.list.push({
      title: 'item ' + ($scope.list.length + 1)
    });
  };

};
