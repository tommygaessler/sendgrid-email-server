const express = require('express');
const router = express.Router();
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

router.post('/', (req, res, next) => {

  const name = req.body.name;
  const username = req.params.username;
  const helper = require('sendgrid').mail;
  const from_email = new helper.Email(req.body.from_email);
  const to_email = new helper.Email('tommy.gaessler@me.com');
  const subject = `New Message From ${name}`;
  const content = new helper.Content('text/plain', `${req.body.message}`);
  const mail = new helper.Mail(from_email, subject, to_email, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    res.status(200).json({
      message: `${name}, thanks for contacting me! I will get back to you asap!`
    });
  });
});

router.post('/alexa', (req, res, next) => {
  const name = 'Austin';
  const helper = require('sendgrid').mail;
  const from_email = new helper.Email('tommy.gaessler@gmail.com');
  const to_email = new helper.Email('amahan0424@gmail.com');
  const subject = `Joke From Tommy`;
  const content = new helper.Content('text/plain', `Hey ${name}! Check out this joke: Whats the scariest primitave? A booolean!`);
  const mail = new helper.Mail(from_email, subject, to_email, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    res.status(200).json({
      message: `Email Sent to ${name}`
    });
  });
});
module.exports = router;
