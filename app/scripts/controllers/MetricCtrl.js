(function() {
  function MetricCtrl(Metric) {
    this.list = Metric.listSongsPlayed();
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['Metric', MetricCtrl]);
})();
