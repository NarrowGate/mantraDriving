
const port = process.env.PORT || 9000;

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('Hello World! ksk2323sksks');
//     res.end();
//   }).listen(port);


  const express = require('express');
  const app = express();

  const helmet = require('helmet')

  const nodemailer = require('nodemailer');

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.static('public'))


// app.get('/', (req, res, next) => {
//   res.render('Hello World! ksk2323sksks');
// })

app.post('/process-contact',(req, res, next) => {

  res.send(req.data)
  console.log(req.body)

  var name = req.body.name,
  email = req.body.email,
  contactNumber = req.body.phone,
  suburb = req.body.suburb,
  subject = req.body.subject,
  enquiry = req.body.enquiry;

  var subjectForEmail = `
<p>Hi Aby, you have a new enquiry from your website</p>
<br>Name : ${name}, <br> 
  Phone : ${contactNumber}, <br> 
  Location : ${suburb}, <br> 
  Subject : ${subject}, <br> 
  More Details : ${enquiry} <br><br>
  Cheers
  `;

  console.log(subjectForEmail);


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'melvinsalmat@gmail.com',
      pass: 'services-123'
    }
  });
  
  const mailOptions = {
    from: 'melvinsalmat@gmail.com',
    to: 'wilsonlifecycle@gmail.com',
    subject: 'A new enquiry for Mantra Driving School',
    html: subjectForEmail
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      //console.log(error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  });

})

  app.listen(port);

