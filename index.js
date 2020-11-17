const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'amartyasarkark8n0cx06w349338@gmail.com',
    pass: '@<?#Vivek&*ma349338$>%'
  }
  // auth: {
  //   user: 'amartyasarkar4@gmail.com',
  //   pass: '@<?#Vivek&*ma4$>%'
  // }
});

app.post("/sendmail", (req, res) => {
  console.log(req.body);
  var clientdata = req.body.clientDetails;

  var mailOptions = {
    to: [clientdata.email,'amartyasarkar0001@gmail.com'],
    from: 'amartyasarkar0001@gmail.com',
    subject: clientdata.name,
    text:` New client Posted a Job For You.Details are here:
          Email: ${clientdata.email}
          Phone no : ${clientdata.phone}
          Name : ${clientdata.fullname}
          Divice Type:${req.body.diviceType}
          Classification:${req.body.classification}
          Model:${req.body.model}
          color:${req.body.color}
          issue:${req.body.issue?req.body.issue:"not defined"}
          Extra Inquary:${req.body.inquaryInput}
          `,
    phone: clientdata.phone
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured");
      res.json({error:"Check Your Email address"})
    } else {
      
      res.json({message:"your Inquary successfully Posted ,Our Experts will contact with you soon",FullDetails:req.body})
      
    }
  });
})

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});