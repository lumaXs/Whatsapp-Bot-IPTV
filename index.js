import { WhatsAppClient } from './modules/whatsapp-client.js'
import { MessageRouter } from './handlers/message-router.js'
import { logger } from './utils/helpers.js'
import { CONFIG } from './config/constants.js'

/**
 * WhatsApp Bot - Automated Customer Service
 * Main entry point and initialization
 */

async function main() {
    try {
        logger.info('🚀 Starting WhatsApp Bot...')

        const whatsappClient = new WhatsAppClient(CONFIG.client.name)

        await whatsappClient.initialize()

        const router = new MessageRouter(whatsappClient.getClient())
        router.listen()

        logger.success('✅ Bot initialized successfully')

        process.on('SIGINT', async () => {
            logger.warn('⚠️  Shutdown signal received...')
            await whatsappClient.destroy()
            process.exit(0)
        })

        process.on('SIGTERM', async () => {
            logger.warn('⚠️  Termination signal received...')
            await whatsappClient.destroy()
            process.exit(0)
        })
    } catch (error) {
        logger.error(`❌ Fatal error: ${error.message}`)
        console.error(error)
        process.exit(1)
    }
}

main()
