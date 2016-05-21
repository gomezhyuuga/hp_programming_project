$(function() {
  console.log('IT WORKS!');
  // Async form submit
  $('#histogram-form').submit(function(event) {
    event.preventDefault();

    $('#loading').show();
    $('#chart').hide();

    var data = $('#histogram-form').serialize();
    $.get('/datastore', data)
      .done(processData)
      .fail(sendError);
  });
});

function processData(data, textStatus, jqXHR) {
  var dataSplit = data.split('\t');
  var key       = dataSplit[0];
  var info      = dataSplit[1].split(',').map(function(el) { return +el; });
  console.log(info);

  plotData(info);
}

function plotData(data) {
  var container = $('#chart');
  var chartData = [{
    x: data,
    type: 'histogram',
  }];

  $('#loading').hide();
  $('#chart').show();
  Plotly.newPlot('chart', chartData);
}

function sendError(jqXHR, textStatus, errorThrown) {
  console.error(jqXHR);
}
