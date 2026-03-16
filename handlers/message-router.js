import { normalizeText, getFirstName, logger } from '../utils/helpers.js'
import { ACTIVATION_WORDS } from '../config/constants.js'
import { commandHandlers } from './command-handlers.js'

/**
 * Routes incoming messages to appropriate command handlers
 * Manages message validation and command execution flow
 */
export class MessageRouter {
    constructor(client) {
        this.client = client
        this.handlers = commandHandlers
    }

    /**
     * Starts listening for incoming messages
     */
    listen() {
        this.client.on('message', async (msg) => {
            try {
                await this.#handleMessage(msg)
            } catch (error) {
                logger.error(`Message processing error: ${error.message}`)
            }
        })

        logger.success('Message router active and listening')
    }

    /**
     * Processes received message
     * @private
     * @param {Object} msg - WhatsApp message object
     */
    async #handleMessage(msg) {
        if (!this.#isValidMessage(msg)) {
            logger.warn(`Message ignored - fromMe: ${msg.fromMe}, from: ${msg.from}`)
            return
        }

        const chat = await msg.getChat()
        const contact = await msg.getContact()
        const name = getFirstName(contact.pushname)
        const cleanedText = normalizeText(msg.body)

        logger.info(`📩 ${contact.pushname || contact.number}: ${msg.body}`)
        logger.info(`🔍 Normalized: "${cleanedText}"`)

        const isActivation = ACTIVATION_WORDS.includes(cleanedText)

        if (isActivation && this.handlers.activated) {
            logger.success(`✅ Activation detected: "${cleanedText}"`)
            return await this.handlers.activated({
                chat,
                msg,
                client: this.client,
                name,
                cleanedText,
            })
        }

        const handler = this.handlers[cleanedText]
        if (handler && typeof handler === 'function') {
            logger.success(`✅ Handler found: "${cleanedText}"`)
            return await handler({
                chat,
                msg,
                client: this.client,
                name,
                cleanedText,
            })
        }

        logger.warn(`⚠️ No handler found: "${cleanedText}"`)
    }

    /**
     * Validates if message should be processed
     * @private
     * @param {Object} msg - WhatsApp message object
     * @returns {boolean} True if message should be processed
     */
    #isValidMessage(msg) {
        if (!msg.body?.trim()) {
            return false
        }

        if (msg.fromMe) {
            return false
        }

        const isPrivateChat = msg.from.endsWith('@c.us') || msg.from.endsWith('@lid')
        if (!isPrivateChat) {
            return false
        }

        return true
    }

    /**
     * Adds custom command handler
     * @param {string} command - Command trigger
     * @param {Function} handler - Handler function
     */
    addHandler(command, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler must be a function')
        }

        this.handlers[command] = handler
        logger.success(`Handler added: ${command}`)
    }

    /**
     * Removes command handler
     * @param {string} command - Command to remove
     */
    removeHandler(command) {
        if (this.handlers[command]) {
            delete this.handlers[command]
            logger.success(`Handler removed: ${command}`)
        }
    }
}
