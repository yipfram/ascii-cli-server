# ASCII CLI Server

A simple CLI animation server inspired by Parrot.live. Host your own animated ASCII art service!

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

Or in development mode:
```bash
npm run dev
```

## Accessing Animations

Use curl to view animations:

```bash
# Default parrot animation
curl localhost:3000

# Hacker theme
curl localhost:3000/?animation=hacker

# Matrix theme
curl localhost:3000/?animation=matrix
```

## Available Endpoints

- `/` - Main animation endpoint
- `/animations` - List all available animations
- `/health` - Health check

## Animation Types

- `parrot` - Tropical parrot animation
- `hacker` - System hacking simulation
- `matrix` - Matrix-style falling code

## Customization

Add new animations by modifying the `animations` object in `server.js`. Each animation should be an array of ASCII art frames.

## Deployment

Deploy to any Node.js hosting service. Set the PORT environment variable if needed.

## Example Deployment on CLI.rrchs.fr

1. Push to your repository
2. Configure deployment on CLI.rrchs.fr
3. Set PORT environment variable
4. Access via: `curl your-domain.rrchs.fr`