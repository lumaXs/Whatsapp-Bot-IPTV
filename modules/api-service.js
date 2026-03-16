import { CONFIG } from '../config/constants.js'
import { validateObject, logger } from '../utils/helpers.js'

/**
 * Service for external API communication
 * Handles HTTP requests and response validation
 */
class ApiService {
    constructor() {
        this.baseUrl = CONFIG.api.baseUrl
        this.headers = CONFIG.api.headers
    }

    /**
     * Generates a free trial by calling the external API
     * @returns {Promise<Object>} Trial data from API
     * @throws {Error} If request fails or response is invalid
     */
    async generateFreeTrial() {
        const url = `${this.baseUrl}${CONFIG.api.endpoints.freeTrial}`

        try {
            logger.info('Requesting free trial from API...')

            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
            })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()

            this.#validateTrialResponse(data)

            logger.success(`Trial generated: ${data.username}`)
            return data
        } catch (error) {
            logger.error(`Failed to generate trial: ${error.message}`)
            throw error
        }
    }

    /**
     * Validates trial API response structure
     * @private
     * @param {Object} data - API response data
     * @throws {Error} If required fields are missing
     */
    #validateTrialResponse(data) {
        const requiredFields = [
            'username',
            'password',
            'dns',
            'package',
            'connections',
            'createdAtFormatted',
            'expiresAtFormatted',
            'payUrl',
        ]

        if (!validateObject(data, requiredFields)) {
            throw new Error('Incomplete API response data')
        }
    }
}

export const apiService = new ApiService()
