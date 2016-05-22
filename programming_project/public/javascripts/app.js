$(function() {
  console.log('IT WORKS!');
  // Async form submit
  $('#histogram-form').submit(function(event) {
    event.preventDefault();
    var key = $('#histogram_key').val();
    if (!key) return;

    $('#instructions').hide();

    $('#loading').show();
    $('#chart').hide();


    $.get('/datastore/' + key)
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
    //histfunc: 'max',
    //nbinsx: 40,
    //xbins: {
      //start: -10,
      //end: 10,
      //size: 0.01,
    //},
  }];
  var key = $('#histogram_key').val();

  $('#loading').hide();
  $('#chart').show();
  Plotly.newPlot('chart', chartData,
                 {
                   title: 'Histogram ' + key,
                 },
                 { displaylogo: false, });
}

function sendError(jqXHR, textStatus, errorThrown) {
  console.error(jqXHR);
  $('#error').show();
}
