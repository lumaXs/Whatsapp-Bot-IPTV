import { CONFIG } from '../config/constants.js'
import { delay, logger } from '../utils/helpers.js'

/**
 * Service for sending WhatsApp messages with typing simulation
 */
class MessageService {
    /**
     * Sends message with typing indicator effect
     * @param {Object} chat - WhatsApp chat object
     * @param {Object} msg - Original message object
     * @param {Object} client - WhatsApp client instance
     * @param {string} text - Message text to send
     * @param {number} [startDelay] - Delay before starting (ms)
     * @param {number} [typingDelay] - Typing duration (ms)
     * @returns {Promise<void>}
     */
    async sendWithTyping(chat, msg, client, text, startDelay = null, typingDelay = null) {
        const delayStart = startDelay ?? CONFIG.delays.typingStart
        const delayTyping = typingDelay ?? CONFIG.delays.typingDuration

        try {
            await delay(delayStart)
            await chat.sendStateTyping()
            await delay(delayTyping)
            await chat.clearState()
            await client.sendMessage(msg.from, text)

            const contact = await msg.getContact()
            const contactName = contact.pushname?.split(' ')[0] || msg.from
            logger.info(`Sent to ${contactName}: "${text.substring(0, 50)}..."`)
        } catch (error) {
            logger.error(`Failed to send message: ${error.message}`)
            throw error
        }
    }

    /**
     * Sends multiple messages in sequence
     * @param {Object} chat - WhatsApp chat object
     * @param {Object} msg - Original message object
     * @param {Object} client - WhatsApp client instance
     * @param {string[]} messages - Array of message texts
     * @returns {Promise<void>}
     */
    async sendMultiple(chat, msg, client, messages) {
        for (const text of messages) {
            await this.sendWithTyping(chat, msg, client, text)
        }
    }

    /**
     * Schedules a message to be sent after delay
     * @param {Object} chat - WhatsApp chat object
     * @param {Object} msg - Original message object
     * @param {Object} client - WhatsApp client instance
     * @param {string} text - Message text
     * @param {number} delayMs - Delay in milliseconds
     * @returns {number} Timeout ID
     */
    scheduleMessage(chat, msg, client, text, delayMs) {
        return setTimeout(async () => {
            try {
                await this.sendWithTyping(chat, msg, client, text, 0, 5000)
            } catch (error) {
                logger.error(`Failed to send scheduled message: ${error.message}`)
            }
        }, delayMs)
    }
}

export const messageService = new MessageService()
