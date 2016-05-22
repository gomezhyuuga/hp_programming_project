var express = require('express');
var exec    = require('child_process').execFileSync;
var fs      = require('fs');
var router  = express.Router();

function create_histogram(key, callback) {
  exec('generator', [key]);
}

/* GET HISTOGRAM BY KEY */
router.get('/datastore/:key', function(req, res, next) {
  var key      = req.params.key;
  var filename = key + '.txt';
  var FILES    = req.app.locals.FILES;

  // Return directly if it already has served before
  if (FILES[filename]) return res.send(FILES[filename]);

  // Try to retrieve the file
  fs.stat(filename, function(err, stats) {
    console.log('Serving ' + filename + '...');
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
    // Store in FILES and send it
    FILES[filename] = data;
    res.send(data);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // GET KEY of histogram
  res.render('index');
});

module.exports = router;
