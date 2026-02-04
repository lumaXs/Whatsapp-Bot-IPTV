/**
 * Bot message templates and responses
 * Centralized message management for consistent communication
 */

export const MESSAGES = {
  welcome: (name) => `Hello, ${name}! Welcome!`,
  intro: 'I am your virtual assistant. How can I help you?',
  menuPrompt: "Type '!menu' to see available options",

  trial: {
    generating: 'Please wait while I generate your trial access...',
    wait: 'This may take a moment depending on server load.',
    instructions: 'Use the credentials above to access your trial. For player setup help, send *"!player"*',
    expired: (name) => `Hi ${name}, your trial period has ended. Would you like to subscribe?`,
  },
};

export const MENU_OPTIONS = {
  main: `
📋 MAIN MENU

1️⃣ About us
2️⃣ What is IPTV?
3️⃣ Plans and pricing
4️⃣ Subscribe
5️⃣ Available content
6️⃣ Request free trial

📌 Send the option number to continue.
`.trim(),

  about: `🔍 About Us

We provide a complete IPTV platform with live channels, movies, series, sports and more.`,

  whatIsIptv: `📡 What is IPTV?

IPTV is TV content transmitted over the internet. Watch your favorite content on mobile, TV or computer without cables or antennas.`,

  plans: `💰 Plans and Pricing

- Monthly: $25.00
- Quarterly: $60.00
- Annual: $200.00

Payment methods: PIX, Credit Card, Bank Transfer.`,

  subscription: `📝 Subscribe

To subscribe now, send: subscribe
Or contact our support team.`,

  content: `🎬 Available Content

+ Live TV channels
+ Sports events (Soccer, UFC, etc.)
+ Latest movies and series
+ Kids content
+ 24/7 programming`,
};

export const CUSTOM_RESPONSES = {
  subscribe: `📲 Subscription

To subscribe, send your full name and choose a plan:
Monthly | Quarterly | Annual

We'll get back to you shortly.`,

  requestTrial: `📺 *Free Trial*

Please provide:

1️⃣ Full name
2️⃣ City/State

We'll activate your 24h access.`,
};

/**
 * Formats trial response from API data
 * @param {Object} data - API response data
 * @returns {string} Formatted message
 */
export const formatTrialResponse = (data) => {
  return `🎉 Trial access generated successfully!

👤 Username: ${data.username}
🔑 Password: ${data.password}
🌐 DNS: ${data.dns}
📦 Package: ${data.package}
🔗 Connections: ${data.connections}
📆 Created: ${data.createdAtFormatted}
⏰ Expires: ${data.expiresAtFormatted}

📺 M3U Link: ${data.m3uUrl}
🔗 Short Link: ${data.shortUrl}

🛒 Payment: ${data.payUrl}`.trim();
};
