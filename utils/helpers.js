import { NORMALIZATION_PATTERNS } from '../config/constants.js'

/**
 * Creates an asynchronous delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Normalizes text by removing diacritics, punctuation and emojis
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
export const normalizeText = (text) => {
    if (!text || typeof text !== 'string') return ''

    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(NORMALIZATION_PATTERNS.diacritics, '')
        .replace(NORMALIZATION_PATTERNS.punctuation, '')
        .replace(NORMALIZATION_PATTERNS.emojiFaces, '')
        .replace(NORMALIZATION_PATTERNS.emojiSymbols, '')
        .replace(NORMALIZATION_PATTERNS.whitespace, ' ')
        .trim()
}

/**
 * Extracts first name from full name
 * @param {string} fullName - Full name string
 * @param {string} fallback - Default value if no name found
 * @returns {string} First name or fallback
 */
export const getFirstName = (fullName, fallback = 'friend') => {
    if (!fullName || typeof fullName !== 'string') return fallback
    return fullName.split(' ')[0] || fallback
}

/**
 * Formats API error for user-friendly display
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const formatApiError = (error) => {
    return `⚠️ Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.`
}

/**
 * Validates if object contains all required properties
 * @param {Object} obj - Object to validate
 * @param {string[]} requiredProps - Required property names
 * @returns {boolean} True if valid
 */
export const validateObject = (obj, requiredProps) => {
    if (!obj || typeof obj !== 'object') return false
    return requiredProps.every((prop) => obj.hasOwnProperty(prop) && obj[prop] != null)
}

/**
 * Console logger with emoji prefixes
 */
export const logger = {
    info: (message) => console.log(`ℹ️  ${message}`),
    success: (message) => console.log(`✅ ${message}`),
    error: (message) => console.error(`❌ ${message}`),
    warn: (message) => console.warn(`⚠️  ${message}`),
}
