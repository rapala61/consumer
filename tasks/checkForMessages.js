const dotenv = require('dotenv').config({ silent: true });

const Consumer = require('../lib/consumer');

const EmailHelper = require('../lib/emailHelper');

const emailHelper = new EmailHelper();

const consumer = new Consumer();

/**
 * Uses the consumer instance to get a message from the message bus
 * and email the payload to an address
 * @param {string} the queue name
 * @param {function} the callback to be executed when a message has been retrieved
 */
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

  emailHelper.sendEmail('Rafa', 'rapala61@gmail.com, dscodetest@mailinator.com', 'signup form submission', emailBody);
});
