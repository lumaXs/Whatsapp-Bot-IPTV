import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import chalk from 'chalk';
import { CONFIG } from '../config/constants.js';

/**
 * WhatsApp client wrapper with auto-reconnection
 * Handles connection lifecycle and event management
 */
export class WhatsAppClient {
  constructor(clientName = CONFIG.client.name) {
    this.clientName = clientName;
    this.reconnectDelay = CONFIG.client.reconnectDelay;
    this.isReconnecting = false;
    this.client = this.#createClient();
    this.#registerEvents();
  }

  /**
   * Creates new client instance with authentication
   * @private
   * @returns {Client} WhatsApp client instance
   */
  #createClient() {
    return new Client({
      authStrategy: new LocalAuth({
        dataPath: `${CONFIG.client.authDataPath}/${this.clientName}`,
      }),
      puppeteer: CONFIG.puppeteer,
    });
  }

  /**
   * Logs messages with color formatting
   * @private
   * @param {Function} colorFn - Chalk color function
   * @param {string} message - Message to log
   */
  #log(colorFn, message) {
    console.log(colorFn(` [${this.clientName}] ${message} `));
  }

  /**
   * Registers client event handlers
   * @private
   */
  #registerEvents() {
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
      this.#log(chalk.bgGray.bold.black, 'Scan QR code above');
    });

    this.client.on('ready', () => {
      this.isReconnecting = false;
      this.#log(chalk.bgGreen.italic.black, 'Client ready');
    });

    this.client.on('auth_failure', (msg) => {
      this.#log(chalk.bgRed.underline.white, `Authentication failed: ${msg}`);
    });

    this.client.on('disconnected', (reason) => {
      this.#log(chalk.bgYellow.bold.white, `Disconnected: ${reason}`);
      this.#reconnect();
    });

    this.client.on('loading_screen', (percent) => {
      if (percent % 10 === 0) {
        this.#log(chalk.bgBlue.white, `Loading: ${percent}%`);
      }
    });
  }

  /**
   * Attempts to reconnect after disconnection
   * @private
   */
  async #reconnect() {
    if (this.isReconnecting) {
      this.#log(chalk.bgYellow.white, 'Reconnection already in progress');
      return;
    }

    this.isReconnecting = true;
    const delaySeconds = this.reconnectDelay / 1000;
    this.#log(chalk.bgBlue.white, `Reconnecting in ${delaySeconds}s...`);

    await new Promise((resolve) => setTimeout(resolve, this.reconnectDelay));

    try {
      await this.client.destroy();
      this.client = this.#createClient();
      this.#registerEvents();
      await this.initialize();
      this.#log(chalk.bgGreen.white, 'Reconnection successful');
    } catch (error) {
      this.#log(chalk.bgRed.white, `Reconnection failed: ${error.message}`);
      this.isReconnecting = false;
      setTimeout(() => this.#reconnect(), this.reconnectDelay);
    }
  }

  /**
   * Initializes the WhatsApp client
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      this.#log(chalk.bgCyan.black, 'Starting connection...');
      await this.client.initialize();
    } catch (error) {
      this.#log(chalk.bgRed.white, `Initialization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Returns the client instance
   * @returns {Client} WhatsApp client
   */
  getClient() {
    return this.client;
  }

  /**
   * Safely destroys the client
   * @returns {Promise<void>}
   */
  async destroy() {
    try {
      this.#log(chalk.bgYellow.white, 'Shutting down client...');
      await this.client.destroy();
      this.#log(chalk.bgGreen.white, 'Client shutdown complete');
    } catch (error) {
      this.#log(chalk.bgRed.white, `Shutdown error: ${error.message}`);
    }
  }
}
