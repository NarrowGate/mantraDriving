const http = require('http');

var port = process.env.PORT || 8070;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World! ksk2323sksks');
    res.end();
  }).listen(port);

