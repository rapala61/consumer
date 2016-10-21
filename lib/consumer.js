/* eslint arrow-body-style: ["error", "always"]*/

const amqp = require('amqplib');

const Promise = require('bluebird');

class Consumer {
  constructor(uri, options = {}) {
    if (typeof uri === 'string' && uri.length) {
      this.uri = uri;
    } else {
      // this.uri = process.env.AMQP_URL || 'amqp://localhost';
      this.uri = 'amqp://localhost';
    }
    this.connection = amqp.connect(this.uri);
  }

  getChannel() {
    return this.connection.then((conn) => {
      return conn.createConfirmChannel();
    });
  }

  consumeMessage(q, fn, opts) {
    const options = opts || { noAck: true };
    const process = (typeof fn === 'function') ? fn : () => {};
    this.getChannel().then((channel) => {
      channel.assertQueue(q);
      channel.consume(q, process, options);
    });
  }

  disconnect() {
    return this.connection.then((conn) => {
      conn.close();
    });
  }
}

module.exports = Consumer;
