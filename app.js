const dotenv = require('dotenv').config({ silent: true });

const Consumer = require('./lib/consumer');

const EmailHelper = require('./lib/emailHelper');

const emailHelper = new EmailHelper();

const consumer = new Consumer();

consumer.consumeMessage('sign_up', (msg) => {
  const msgBody = JSON.parse(msg.content.toString());
  const emailBody = `
  <h2>The following user has signed up</h2>
  <hr>
  <strong>name:</strong> ${msgBody.name} <br>
  <strong>email:</strong> ${msgBody.email}<br>
  <strong>date of birth:</strong> ${msgBody.dob}<br>
  <strong>password:</strong> ${msgBody.password}<br>
  <strong>password confirmation:</strong> ${msgBody.password_confirm}<br>`;

  emailHelper.sendEmail('Rafa', 'rapala61@gmail.com', 'signup form submission', emailBody);
});
