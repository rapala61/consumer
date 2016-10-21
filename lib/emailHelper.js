const nodemailer = require('nodemailer');

const smtpTransport = require('nodemailer-smtp-transport');

/**
 * Encapsulates the logic used to send emails with nodemailer
 */
class Emailer {
  constructor(config) {
    this.transporter = nodemailer.createTransport(
      smtpTransport(`smtps://${process.env.EMAIL_USERNAME}:${process.env.EMAIL_PASS}@smtp.mailgun.org`)
    );
  }

  /**
   * Sends the email
   * @param {string} identifier for the person sending the email
   * @param {string} email of the person who will receive the email
   * @param {string} what the receipient will see as the subject of this email
   * @html {string} the html body of the message
   */
  sendEmail(from, to, subject, html) {
    const mailOpts = {
      from,
      to,
      subject,
      html
    };

    this.transporter.sendMail(mailOpts, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log(`Message sent:${info.response}`);
    });
  }
}

module.exports = Emailer;
