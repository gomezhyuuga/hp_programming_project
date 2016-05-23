var app = angular.module('histogram-app', []);
app.controller('ChartCtrl', function($scope, $http) {
  // MODEL ATTRS
  $scope.error        = false;
  $scope.data         = undefined;
  $scope.settings     = {xbins: { start: 0, end: 0, size: 0 }};
  $scope.key          = 1;
  $scope.loadingChart = false;

  // FN TO REQUEST THE DATA
  $scope.request = function() {
    console.log('Requesting data with key: ' + $scope.key);

    $scope.loadingChart = true;
    var req = $http.get('/datastore/' + $scope.key);
    req.then(function (response) {
      $scope.data         = processData(response.data);
      $scope.error        = false;

      plotData('Histogram ' + $scope.key, $scope.data);

      var chartData = document.getElementById('chart').data[0];
      $scope.settings.xbins = chartData.xbins;
      $scope.loadingChart = false;
    });
    req.catch(function (response) {
      $scope.error        = true;
      $scope.loadingChart = false;
    });
  };

  // FN TO UPDATE THE CHART
  $scope.updateChart = function() {
    console.log('Updating chart...');
    var chart       = document.getElementById('chart');
    var chartData   = chart.data[0];
    chartData.xbins = $scope.settings.xbins;
    Plotly.redraw(chart);
  };
});

function processData(data) {
  var dataSplit = data.split('\t');
  var info      = dataSplit[1].split(',');

  return info.map(function(el) { return +el; });
}

function plotData(title, data) {
  var container = document.getElementById('chart');
  var layout    = {
    title: title,
    xaxis: { dtick: 0.2, },
  };
  var options   = { displaylogo: false, displayModeBar: true };

  var chartData = [{
    x: data,
    type: 'histogram',
  }];

  Plotly.newPlot(container, chartData, layout, options).then(resizeChart);
  window.onresize = resizeChart; // Responsive Chart
}

function resizeChart() {
  Plotly.Plots.resize(document.getElementById('chart'));
}
