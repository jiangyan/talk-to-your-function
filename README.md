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

## License

[Add your license information here]
