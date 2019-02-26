
const port = process.env.PORT || 9000;

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('Hello World! ksk2323sksks');
//     res.end();
//   }).listen(port);

  
  const express = require('express');
  const app = express();

  const helmet = require('helmet');

  const nodemailer = require('nodemailer');

  const paypal = require('paypal-rest-sdk');




  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded());


  app.use(express.static('public'))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


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

    // auth: {
    //   user: 'vyneyardz@yahoo.com',
    //   pass: 'audioslave'
    // }

    // host: "smtp.yahoo.com", // hostname
    // secureConnection: true, // use SSL
    // port: 465, // port for secure SMTP


    service: 'Yahoo',
    auth: {
      user: 'vyneyardz@yahoo.com',
      pass: 'audioslave'
    }



    // service: 'gmail',
    // auth: {
    //   user: 'melvinsalmat@gmail.com',
    //   pass: 'services-123'
    // }
  });
  
  const mailOptions = {
     from: 'vyneyardz@yahoo.com',
    // from: 'melvinsalmat@gmail.com',
    to: 'wilsonlifecycle@gmail.com',
    subject: 'A new enquiry for Mantra Driving School',
    html: subjectForEmail
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

})




app.post('/buywithpaypal',(req, res, next) => {
  console.log('hit');

  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYT6m6bJPcMrjZXHFgTOFIHfoWvEg6rP7HxI0KdAYb6rI6A9m5yPHNVJVecMHHCTwLFmy8jkm-bC3cnr',
    'client_secret': 'EKB0005ClxbAjcnmo_XrwOIWXq4rR8dxIvbdagXc3EmleHy_OvOIE0-rPAswB2eL-oT-yuwwp3ifNLLf'
  });
  
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:9000/success",
        "cancel_url": "http://localhost:9000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Driving Test",
                "sku": "001",
                "price": "34.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "34.00"
        },
        "description": "Driving Test purchase description."
    }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        // console.log("Create Payment Response");
        // console.log(payment);
        // res.send('test');

        for(let i = 0; i < payment.links.length; i++) {
          if(payment.links[i].rel === "approval_url") {

            console.log(payment.links[i].href);
            //res.redirect(payment.links[i].href);
            res.send(payment.links[i].href);
            return payment.links[i].href;
          }
        }

    }
  });



})

  app.listen(port);

