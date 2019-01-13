
const port = process.env.PORT || 9000;

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('Hello World! ksk2323sksks');
//     res.end();
//   }).listen(port);


  const express = require('express');
  const app = express();

  app.use(express.static('public'))


// app.get('/', (req, res, next) => {
//   res.render('Hello World! ksk2323sksks');
// })

  app.listen(port);

