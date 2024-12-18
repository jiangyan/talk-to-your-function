# Voice-Controlled Car and Math Hands Demo

This project demonstrates real-time voice control of a virtual car and hand gestures using the OpenAI Realtime API over WebRTC. Built with Cloudflare Workers and Hono, it provides an interactive interface where you can control a car's movement and manipulate virtual hand gestures using voice commands.

[Add your demo video/image here]

## Features

### Car Control
- Voice-controlled car movement (up, down, left, right)
- Adjustable speed settings (0-5)
- Real-time visual feedback
- Smooth animation and boundary detection

### Math & Hand Gestures
- Interactive virtual hands with individual finger control
- Visual math calculations using finger positions
- Support for complex finger combinations
- Real-time finger counting display

## Voice Commands

### Car Control
- "Move the car [up/down/left/right]"
- "Stop the car"
- "Set speed to [0-5]"

### Hand Control
- "What is [number] plus [number]?"
- "Raise [left/right] [finger name]" (thumb, index, middle, ring, pinky)
- "Show [number] fingers"
- "Raise left index and right thumb"
- "Reset hands"

## Getting Started

1. Clone the repository
2. Copy `.dev.vars.example` to `.dev.vars` and add your OpenAI API Key:
```bash
OPENAI_API_KEY="your-key-here"
```

3. Install dependencies:
```bash
npm install
```

4. Run locally:
```bash
npm run dev
```

## Deployment

1. Upload your OpenAI API Key to Cloudflare:
```bash
npx wrangler secret put OPENAI_API_KEY
```

2. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Technical Stack

- **Frontend**: HTML5 Canvas, WebRTC, JavaScript
- **Backend**: Cloudflare Workers, Hono framework
- **Voice Processing**: OpenAI Realtime API
- **Real-time Communication**: WebRTC

## Development

The project uses:
- HTML5 Canvas for rendering the car and hands
- WebRTC for real-time voice communication
- OpenAI's Realtime API for voice command processing
- Cloudflare Workers for hosting and API routing

## Credits & Attribution

This project is a modified version of [talk-to-javascript-openai-workers](https://github.com/craigsdennis/talk-to-javascript-openai-workers) by Craig Dennis. The original project demonstrated WebRTC and OpenAI Realtime API integration. This version has been adapted to create a voice-controlled car and math visualization demo while maintaining the same technical foundation.

Key modifications include:
- Added virtual car control system with voice commands
- Implemented virtual hands for math visualization
- Enhanced UI/UX for interactive demonstrations
- Added real-time visual feedback systems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the same terms as the original project by Craig Dennis. Please refer to the [original repository](https://github.com/craigsdennis/talk-to-javascript-openai-workers) for license details.

## Acknowledgments

- [Craig Dennis](https://github.com/craigsdennis) for the original WebRTC implementation
- [OpenAI](https://openai.com) for the Realtime API
- [Cloudflare Workers](https://workers.cloudflare.com) for hosting infrastructure
- [Hono](https://honojs.dev) for the backend framework
