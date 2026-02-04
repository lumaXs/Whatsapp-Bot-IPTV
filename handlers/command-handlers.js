import { messageService } from '../modules/message-service.js';
import { apiService } from '../modules/api-service.js';
import { MESSAGES, MENU_OPTIONS, CUSTOM_RESPONSES, formatTrialResponse } from '../config/messages.js';
import { CONFIG } from '../config/constants.js';
import { formatApiError } from '../utils/helpers.js';

/**
 * Command handlers for bot interactions
 * Maps user commands to appropriate responses
 */
export const commandHandlers = {
  /**
   * Welcome message handler
   */
  activated: async ({ chat, msg, client, name }) => {
    const messages = [
      MESSAGES.welcome(name),
      MESSAGES.intro,
      MESSAGES.menuPrompt
    ];
    await messageService.sendMultiple(chat, msg, client, messages);
  },

  /**
   * Main menu command
   */
  '!menu': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.main);
  },

  /**
   * Menu option 1 - About
   */
  '1': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.about);
  },

  /**
   * Menu option 2 - What is IPTV
   */
  '2': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.whatIsIptv);
  },

  /**
   * Menu option 3 - Plans
   */
  '3': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.plans);
  },

  /**
   * Menu option 4 - Subscribe
   */
  '4': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.subscription);
  },

  /**
   * Menu option 5 - Content
   */
  '5': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, MENU_OPTIONS.content);
  },

  /**
   * Menu option 6 - Free trial
   */
  '6': async ({ chat, msg, client, name }) => {
    await handleFreeTrial({ chat, msg, client, name });
  },

  /**
   * Trial command
   */
  '!trial': async ({ chat, msg, client, name }) => {
    await handleFreeTrial({ chat, msg, client, name });
  },

  /**
   * Subscribe command
   */
  'subscribe': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, CUSTOM_RESPONSES.subscribe);
  },

  /**
   * Request trial command
   */
  'request trial': async ({ chat, msg, client }) => {
    await messageService.sendWithTyping(chat, msg, client, CUSTOM_RESPONSES.requestTrial);
  },

  /**
   * Player help command
   */
  '!player': async ({ chat, msg, client }) => {
    const playerHelp = `📱 *Recommended Players*

*Android:*
• IPTV Smarters Pro (Recommended)
• TiviMate
• GSE Smart IPTV

*iOS:*
• GSE Smart IPTV Pro
• IPTV Smarters Pro

*TV/FireStick:*
• IPTV Smarters Pro
• TiviMate Premium

*Setup:*
1️⃣ Install the app
2️⃣ Choose "Login with Xtream Codes"
3️⃣ Enter: Username, Password and DNS
4️⃣ Enjoy!

Need help? Type "!tutorial"`;

    await messageService.sendWithTyping(chat, msg, client, playerHelp);
  },
};

/**
 * Handles free trial generation flow
 * @private
 * @param {Object} params - Handler parameters
 */
async function handleFreeTrial({ chat, msg, client, name }) {
  try {
    await messageService.sendMultiple(chat, msg, client, [
      MESSAGES.trial.generating,
      MESSAGES.trial.wait,
    ]);

    const trialData = await apiService.generateFreeTrial();

    const response = formatTrialResponse(trialData);
    await messageService.sendWithTyping(chat, msg, client, response);

    await messageService.sendWithTyping(chat, msg, client, MESSAGES.trial.instructions);

    messageService.scheduleMessage(
      chat,
      msg,
      client,
      MESSAGES.trial.expired(name),
      CONFIG.delays.trialExpiry
    );
  } catch (error) {
    const errorMessage = formatApiError(error);
    await messageService.sendWithTyping(chat, msg, client, errorMessage);
  }
}
