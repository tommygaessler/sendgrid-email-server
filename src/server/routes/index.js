const express = require('express');
const router = express.Router();
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

router.post('/', (req, res, next) => {

  console.log('hit');

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

module.exports = router;
