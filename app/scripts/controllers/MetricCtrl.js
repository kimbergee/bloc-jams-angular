(function() {
  function MetricCtrl($scope, Metric, Fixtures) {
    var vm = this;
    Metric.getSongPlays().$loaded().then(function() {
      vm.countList = Metric.getSongPlayCounts();
      $scope.data = vm.countList;
    });

    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['$scope', 'Metric', 'Fixtures', MetricCtrl]);
})();
