(function() {
  function MetricCtrl($scope, Metric, Fixtures) {
    this.list = Metric.listSongsPlayed();

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

    $scope.data = [
      {
        key: "Blue",
        y: 15
      },
      {
        key: "Green",
        y: 20
      },
      {
        key: "Red",
        y: 7
      },
      {
        key: "Pink",
        y: 15
      },
      {
        key: "Magenta",
        y: 10
      }
    ];
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['$scope', 'Metric', 'Fixtures', MetricCtrl]);
})();
