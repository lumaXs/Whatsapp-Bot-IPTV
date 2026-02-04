# WhatsApp Bot

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=white)

Professional WhatsApp bot with modular architecture for automated customer service and support.

## Features

- **Modular Architecture**: Clean separation of concerns with dedicated modules
- **Auto-Reconnection**: Automatic reconnection handling with exponential backoff
- **Environment Configuration**: Secure credential management via `.env` files
- **Command Routing**: Flexible command handler system
- **Typing Simulation**: Natural conversation flow with typing indicators
- **Message Scheduling**: Schedule delayed messages for timed responses
- **Graceful Shutdown**: Clean process termination handling
- **Extensible**: Easy to add new commands and features

## Architecture

```
whatsapp-bot/
├── config/
│   ├── constants.js       # Configuration and environment variables
│   └── messages.js        # Message templates
├── modules/
│   ├── whatsapp-client.js # WhatsApp connection management
│   ├── message-service.js # Message sending utilities
│   └── api-service.js     # External API integration
├── handlers/
│   ├── message-router.js  # Message routing logic
│   └── command-handlers.js # Command implementations
├── utils/
│   └── helpers.js         # Utility functions
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── index.js               # Application entry point
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+ or Bun runtime
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/lumaxs/whatsapp-bot.git
cd whatsapp-bot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the bot:
```bash
npm start
# or
bun start
```

5. Scan the QR code with WhatsApp to authenticate

## Configuration

Create a `.env` file based on `.env.example`:

```env
# WhatsApp Configuration
CLIENT_NAME=your-bot-name
AUTH_DATA_PATH=./.wwebjs_auth

# API Configuration
API_BASE_URL=https://api.example.com
API_ENDPOINT_TRIAL=/path/to/trial
API_USER_AGENT=Mozilla/5.0

# Timing Configuration (milliseconds)
TYPING_START_DELAY=3000
TYPING_DURATION=2000
TRIAL_EXPIRY_TIME=14400000

# Puppeteer Configuration
PUPPETEER_HEADLESS=true
PUPPETEER_TIMEOUT=60000
PUPPETEER_PROTOCOL_TIMEOUT=180000
```

## Usage

### Available Commands

**Activation Words:**
- `oi`, `ola`, `bom dia`, `boa tarde`, `boa noite`

**Menu Commands:**
- `!menu` - Display main menu
- `1-6` - Menu options
- `!trial` - Generate free trial
- `!player` - Player setup help
- `subscribe` - Subscription process

### Adding Custom Commands

Add new command handlers in `handlers/command-handlers.js`:

```javascript
export const commandHandlers = {
  // ... existing commands
  
  'your-command': async ({ chat, msg, client, name }) => {
    await messageService.sendWithTyping(
      chat, msg, client,
      'Your response here'
    );
  },
};
```

### Runtime Command Addition

```javascript
const router = new MessageRouter(client);

router.addHandler('custom', async ({ chat, msg, client }) => {
  await messageService.sendWithTyping(chat, msg, client, 'Custom response');
});

router.listen();
```

## Development

### Project Structure

- **config/**: Application configuration and constants
- **modules/**: Core functionality (WhatsApp client, services)
- **handlers/**: Message routing and command handling
- **utils/**: Helper functions and utilities

### Best Practices

- All configuration in `config/constants.js`
- Message templates in `config/messages.js`
- Use services for external interactions
- Keep handlers focused on single responsibility
- Add JSDoc comments for public methods
- Use private methods (`#method`) for internal logic

## API Integration

The bot integrates with external APIs through `modules/api-service.js`. Configure your API endpoints in `.env`:

```javascript
const response = await apiService.generateFreeTrial();
```

## Error Handling

The bot includes comprehensive error handling:

- Network errors with retry logic
- Invalid message validation
- API failure recovery
- Graceful shutdown on signals

## Logging

Structured logging with emoji indicators:

- ℹ️ Info messages
- ✅ Success operations
- ❌ Error events
- ⚠️  Warnings

## Security

- **Environment Variables**: Sensitive data in `.env` (not committed)
- **Input Validation**: All user inputs validated
- **Private Methods**: Internal logic encapsulated
- **Error Messages**: No sensitive data in error responses

## Deployment

### Production Checklist

- [ ] Set `PUPPETEER_HEADLESS=true`
- [ ] Configure proper timeouts
- [ ] Set up process manager (PM2, systemd)
- [ ] Enable error logging
- [ ] Set up monitoring
- [ ] Secure `.env` file permissions

### Using PM2

```bash
pm2 start index.js --name whatsapp-bot
pm2 save
pm2 startup
```

## Troubleshooting

**QR Code Not Appearing:**
- Check Puppeteer configuration
- Ensure sufficient memory
- Try running with `PUPPETEER_HEADLESS=false`

**Connection Drops:**
- Check network stability
- Verify WhatsApp Web is accessible
- Adjust timeout values in `.env`

**Commands Not Working:**
- Verify command normalization
- Check handler registration
- Review logs for errors

## Contributing

Contributions welcome! Please follow these guidelines:

1. Follow existing code style
2. Add JSDoc comments
3. Update README for new features
4. Test thoroughly before submitting
5. Keep commits atomic and descriptive

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp Web API
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - QR code generation
- [chalk](https://github.com/chalk/chalk) - Terminal styling

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review documentation

---

**Note:** This bot uses unofficial WhatsApp Web API. Use responsibly and comply with WhatsApp Terms of Service.
