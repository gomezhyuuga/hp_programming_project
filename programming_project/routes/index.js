var express = require('express');
var exec    = require('child_process').execFileSync;
var fs      = require('fs');
var router  = express.Router();

function create_histogram(key, callback) {
  exec('generator', [key]);
}

/* GET HISTOGRAM BY KEY */
router.get('/datastore/:key', function(req, res, next) {
  console.log(req.params.key);
  var key      = req.params.key;
  var filename = key + '.txt';
  fs.stat(filename, function(err, stats) {
    if (err) {
      // Histogram doesn't exist. Create.
      console.log('Creating histogram ' + key + '...');
      try {
        var stdout = exec('./generator', [key]);
        console.log("" + stdout);
      } catch (e) {
        console.error(e);
        return res.sendStatus(500);
      }
    }

    var data = fs.readFileSync(filename);
    res.send(data);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // GET KEY of histogram
  res.render('index');
});

module.exports = router;
