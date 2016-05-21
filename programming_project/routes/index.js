var express = require('express');
var exec    = require('child_process').execFileSync;
var fs      = require('fs');
var router  = express.Router();

function create_histogram(key) {
  exec('generator', [key], function (error, stdout, stderr) {
    console.log(stdout);
    if (error) return res.sendStatus(500);
  });
}

/* GET HISTOGRAM BY KEY */
router.get('/datastore', function(req, res, next) {
  var key = 1;
  var filename = key + '.txt';
  fs.stat(filename, function(err, stats) {
    if (err) {
      // Histogram doesn't exist. Create.
      console.log('Creating histogram ' + key + '...');
    }

    setTimeout(function() {
      var data = fs.readFileSync(filename);
      res.send(data);
    }, 5 * 1000); // Delay to see the loading spinner
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // GET KEY of histogram
  res.render('index', { output: 'hi' });
});

module.exports = router;
