/* eslint arrow-body-style: ["error", "always"]*/

const amqp = require('amqplib');

/**
 * Represents the amqplib API as a Consumer class
 */
class Consumer {
  constructor(uri, options = {}) {
    if (typeof uri === 'string' && uri.length) {
      this.uri = uri;
    } else {
      this.uri = process.env.AMQP_URL || 'amqp://localhost';
      // this.uri = 'amqp://localhost';
    }
    this.connection = amqp.connect(this.uri);
  }

  /**
   * Creates a channel for the publishing of messages
   * @return {Promise}
   * @resolve {Channel}
   */
  getChannel() {
    return this.connection.then((conn) => {
      return conn.createChannel();
    });
  }

  /**
   * Consumes a message from the message bus
   * @param {string} The queue name that will be asserted and used to retrieve messages from
   * @param {function} called to parse the message when successfully retrieving one
   * @param {Object} noAck
   */
  consumeMessage(q, fn, opts) {
    const options = opts || { noAck: true };
    const process = (typeof fn === 'function') ? fn : () => {};
    this.getChannel().then((channel) => {
      channel.assertQueue(q);
      channel.get(q, options).then((msg) => {
        if (msg) {
          process(msg);
        }
        this.disconnect();
      });
    });
  }

  /**
   * Closes the connection to the message bus
   * @return {Promise}
   */
  disconnect() {
    return this.connection.then((conn) => {
      conn.close();
    });
  }
}

module.exports = Consumer;
