const nodemailer = require('nodemailer');

const smtpTransport = require('nodemailer-smtp-transport');

class Emailer {
  constructor(config) {
    this.transporter = nodemailer.createTransport(
      smtpTransport(`smtps://${process.env.EMAIL_USERNAME}%40gmail.com:${process.env.EMAIL_PASS}@smtp.gmail.com`)
    );
  }

  sendEmail(from, to, subject, html) {
    const mailOpts = {
      from,
      to,
      subject,
      html
    };

    // send mail with defined transport object
    this.transporter.sendMail(mailOpts, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log(`Message sent:${info.response}`);
    });
  }
}

module.exports = Emailer;
