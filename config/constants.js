import 'dotenv/config'

/**
 * Application configuration constants
 * All sensitive data should be stored in .env file
 */
export const CONFIG = {
    client: {
        name: process.env.CLIENT_NAME || 'whatsapp-bot',
        authDataPath: process.env.AUTH_DATA_PATH || './.wwebjs_auth',
        reconnectDelay: 5000,
    },

    delays: {
        typingStart: parseInt(process.env.TYPING_START_DELAY) || 3000,
        typingDuration: parseInt(process.env.TYPING_DURATION) || 2000,
        trialExpiry: parseInt(process.env.TRIAL_EXPIRY_TIME) || 14400000,
    },

    api: {
        baseUrl: process.env.API_BASE_URL,
        endpoints: {
            freeTrial: process.env.API_ENDPOINT_TRIAL,
        },
        headers: {
            'User-Agent': process.env.API_USER_AGENT || 'Mozilla/5.0',
            Accept: 'application/json',
            Referer: 'https://google.com',
            Connection: 'keep-alive',
        },
    },

    puppeteer: {
        headless: process.env.PUPPETEER_HEADLESS === 'true',
        executablePath: '/usr/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: parseInt(process.env.PUPPETEER_TIMEOUT) || 60000,
        protocolTimeout: parseInt(process.env.PUPPETEER_PROTOCOL_TIMEOUT) || 180000,
    },
}

/**
 * Bot activation trigger words
 */
export const ACTIVATION_WORDS = ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite']

/**
 * Text normalization patterns
 */
export const NORMALIZATION_PATTERNS = {
    diacritics: /[\u0300-\u036f]/g,
    punctuation: /[.,?¡¿…'"""()@#$%^&*+=~`´°(){}[\]<>\/|]/g,
    emojiFaces: /[\u{1F600}-\u{1F6FF}]/gu,
    emojiSymbols: /[\u{2600}-\u{26FF}]/gu,
    whitespace: /\s+/g,
}
