const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ASCII art frames for a simple animation
const frames = [
  `
    .--.
   |o_o |
   |:_/ |
  //   \ \
 (|     | )
/'\_   _/\`
\___)=(___/
  `,
  `
    .--.
   |o_o |
   |:_/ |
  //   \ \
 (|     | )
/'\_   _/\`
\___)=(___/
🐦
  `,
  `
    .--.
   |o_o |
   |:_/ |
  //   \ \\
 (|     | )
/'\_   _/\`
\___)=(___/
🦜
  `,
  `
    .--.
   |o_o |
   |:_/ |
  //   \ \
 (|     | )
/'\_   _/\`
\___)=(___/
✨
  `
];

// Different animation types
const animations = {
  parrot: [
    `
   ╭──────────────────╮
   │      🦜          │
   │  🌴🌴🌴🌴🌴🌴    │
   │  🌴🌴🌴🌴🌴🌴    │
   │      🦜          │
   ╰──────────────────╯
    `,
    `
   ╭──────────────────╮
   │    🦜 🦜          │
   │  🌴🌴🌴🌴🌴🌴    │
   │  🌴🌴🌴🌴🌴🌴    │
   │    🦜 🦜          │
   ╰──────────────────╯
    `,
    `
   ╭──────────────────╮
   │  🦜   🦜   🦜     │
   │  🌴🌴🌴🌴🌴🌴    │
   │  🌴🌴🌴🌴🌴🌴    │
   │  🦜   🦜   🦜     │
   ╰──────────────────╯
    `
  ],
  hacker: [
    `
   [ SYSTEM ACCESS ]
   > Loading modules...
   ████▓▓▓▓▓▓▓▓▓▓███
   ████████████████
   `,
    `
   [ HACKING IN PROGRESS ]
   > Bypassing firewall...
   ▓▓▓▓████████▓▓▓▓
   ████████████████
   `,
    `
   [ ACCESS GRANTED ]
   > Root privileges acquired
   ████████████████
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   `
  ],
  matrix: [
    `
   01110100 01100101 01110010 01101101
   01101001 01101110 01100001 01101100
   01101101 01100001 01110100 01110010
   `,
    `
   💚 01110100 01100101 💚
   01101001 💚 01101110 01100001
   01101111 💚 01100001 01110100 💚
   💚 01101101 01100001 01110100 💚
   `,
    `
   💚💚 01110100 💚💚
   01101001 💚💚 01101110
   💚💚 01101111 💚💚
   01101101 💚💚 01110100 💚💚
   `
  ]
};

app.get('/', (req, res) => {
  // Get animation type from query parameter, default to 'parrot'
  const animationType = req.query.animation || 'parrot';
  const animationFrames = animations[animationType] || animations.parrot;

  // Set headers for streaming response
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let frameIndex = 0;
  const interval = setInterval(() => {
    // Clear screen and move cursor to top
    res.write('\x1b[2J\x1b[H');

    // Display current frame
    res.write(animationFrames[frameIndex]);
    res.write('\n\nPress Ctrl+C to exit | Animation: ' + animationType);

    // Move to next frame
    frameIndex = (frameIndex + 1) % animationFrames.length;
  }, 200); // Change frame every 200ms

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(interval);
  });

  req.on('end', () => {
    clearInterval(interval);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', animations: Object.keys(animations) });
});

// List available animations
app.get('/animations', (req, res) => {
  const animationList = Object.keys(animations).map(name => ({
    name,
    frames: animations[name].length,
    url: `/?animation=${name}`
  }));

  res.json({
    available_animations: animationList,
    usage: 'curl [URL]/?animation=[name]'
  });
});

app.listen(port, () => {
  console.log(`🚀 ASCII CLI Server running on port ${port}`);
  console.log(`📺 Available animations: ${Object.keys(animations).join(', ')}`);
  console.log(`🔗 Usage: curl localhost:${port}/?animation=parrot`);
  console.log(`🔗 Or try: curl localhost:${port}/?animation=hacker`);
  console.log(`🔗 Or try: curl localhost:${port}/?animation=matrix`);
});