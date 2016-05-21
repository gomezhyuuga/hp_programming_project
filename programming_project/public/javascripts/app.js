$(function() {
  console.log('IT WORKS!');
  // Async form submit
  $('#histogram-form').submit(function(event) {
    event.preventDefault();

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
}

function sendError(jqXHR, textStatus, errorThrown) {
  console.error(jqXHR);
}
