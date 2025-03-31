# Spline MCP Server

An MCP server for working with the [Spline](https://spline.design) 3D design tool API. This server provides a convenient interface for AI models like Claude, GPT, and others to interact with Spline's features, including exporting scenes, importing models, creating animations, and managing projects.

## What is this?

This project allows AI assistants to control Spline 3D design software. Think of it as a bridge between AI and the 3D design world.

**For non-technical users:** This tool helps your AI assistant work with Spline, allowing it to help you create and manage 3D designs through simple conversations.

**For developers:** This is an MCP (Model Control Protocol) server implementation for Spline, making the Spline API accessible to AI assistants through a standardized interface.

## Features

### Basic Operations
- Export Spline scenes to various formats (GLB, GLTF, FBX, OBJ)
- Import 3D models into Spline
- Get details about Spline scenes
- List available Spline scenes

### Animation Capabilities
- Create keyframe animations for objects
- Trigger existing animations
- List animations in a scene
- Create event-triggered animations (onClick, onHover, etc.)

## Installation

### Prerequisites

Before you begin, make sure you have:
- [Node.js](https://nodejs.org/) installed (version 14 or higher)
- A Spline account and API key from [Spline](https://spline.design)
- Basic familiarity with using the command line/terminal

### From npm (once published)

```bash
# Install the package globally
npm install -g spline-mcp-server
```

### From Source (For Beginners)

Follow these step-by-step instructions:

1. Open your terminal/command prompt
2. Clone this repository:
   ```bash
   git clone https://github.com/Youbadawy/Spline-MCP.git
   ```
3. Navigate to the project folder:
   ```bash
   cd Spline-MCP
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a file named `.env` in the project folder
2. Add your Spline API credentials to the file:
   ```
   SPLINE_API_KEY=your_api_key_here
   SPLINE_API_URL=https://api.spline.design
   ```

To get your Spline API key:
1. Log in to your [Spline](https://spline.design) account
2. Go to your account settings
3. Look for the API section to generate a key

## Running the Server

### Using the CLI (if installed globally)

```bash
spline-mcp-server
```

### Using npm scripts (if installed from source)

```bash
npm start
```

You should see a message like:
```
spline-mcp-server is running on port 3000
Server information available at http://localhost:3000/
API endpoints available at http://localhost:3000/api/*
OpenAPI specification available at http://localhost:3000/openapi.json
```

## Testing Your Installation

To verify everything is working:

1. Open your web browser
2. Go to http://localhost:3000/
3. You should see basic server information in JSON format
4. Visit http://localhost:3000/openapi.json to view the full API specification

## Connecting to AI-Powered IDEs

You can connect this MCP server to various AI-powered IDEs to enhance their capabilities with Spline integration.

### Cursor AI

To connect to Cursor AI:

1. Make sure the Spline MCP server is running locally
2. Create an `mcp_config.json` file in your project directory with:
   ```json
   {
     "name": "spline",
     "url": "http://localhost:3000"
   }
   ```
   (A more detailed version of this file is already included in this repository)
3. In Cursor, open the command palette (Ctrl+Shift+P or Cmd+Shift+P)
4. Select "Connect to MCP Server"
5. Choose "Local" and select your `mcp_config.json` file
6. You can now interact with Spline through Cursor AI by asking questions like "List my available Spline scenes" or "Export my Spline scene to GLB format"

### Claude

To connect to Claude (in web interface):

1. Make sure the Spline MCP server is running locally
2. Share the OpenAPI spec with Claude by providing this URL: `http://localhost:3000/openapi.json`
3. Tell Claude about the API capabilities and how to interact with Spline
4. You can now ask Claude to perform Spline operations for you

### Cline

To connect to Cline (command-line Claude interface):

1. Make sure the Spline MCP server is running locally
2. Add the Spline MCP server to your Cline configuration:
   ```bash
   cline config set mcp.spline.url "http://localhost:3000"
   ```
3. Enable the MCP server in your Cline session:
   ```bash
   cline --enable-mcp=spline
   ```
4. You can now interact with Spline through Cline

### Windsurf

To connect to Windsurf:

1. Make sure the Spline MCP server is running locally
2. In Windsurf settings, go to "Integrations" > "MCP Servers"
3. Add a new MCP server with:
   - Name: Spline
   - URL: http://localhost:3000
4. Save and enable the integration
5. You can now use Spline features directly in Windsurf

## Troubleshooting

If you encounter issues:

1. **Server won't start**
   - Ensure you have Node.js v14 or higher installed (`node -v`)
   - Check that all dependencies are installed (`npm install`)
   - Verify your .env file is in the correct location and formatted properly

2. **API connection issues**
   - Verify your Spline API key is correct
   - Check that the server is running (http://localhost:3000 should be accessible)
   - Look for error messages in the terminal where the server is running

3. **IDE connection issues**
   - Verify the server is running locally
   - Check that the MCP configuration has the correct URL
   - Restart your IDE after connecting to the MCP server

## Using the Client

The server includes a JavaScript client that developers can use to interact with it programmatically:

```javascript
import { McpClient } from 'spline-mcp-server/src/utils/mcpClient.js';

const client = new McpClient({
  baseUrl: 'http://localhost:3000'
});

// List scenes
const scenes = await client.listScenes({ limit: 5 });
console.log(scenes);

// Export a scene
const result = await client.exportScene({
  sceneId: 'your-scene-id',
  format: 'glb'
});
console.log(result);
```

See the `examples` directory for more examples.

## API Endpoints

The server exposes the following API endpoints:

### Basic Operations

- `POST /api/exportScene`: Export a Spline scene
- `POST /api/importScene`: Import a 3D model into Spline
- `POST /api/getSceneDetails`: Get details about a Spline scene
- `POST /api/listScenes`: List available Spline scenes

### Animation Operations

- `POST /api/createAnimation`: Create a new animation
- `POST /api/triggerAnimation`: Trigger an existing animation
- `POST /api/listAnimations`: List animations in a scene
- `POST /api/createEventAnimation`: Create an event-triggered animation

## OpenAPI Specification

The server provides an OpenAPI specification at `/openapi.json` that describes all available endpoints and their parameters.

## Using with AI Models

This MCP server can be used with AI models to interact with Spline's features. Here are some examples of what you can ask the AI to do:

### Basic Operations

```
List my available Spline scenes
```

```
Export my Spline scene with ID "abc123" to GLB format
```

```
Import the 3D model from "https://example.com/model.glb" into my Spline project
```

```
Get details for my Spline scene with ID "abc123"
```

### Animation Operations

```
Create an animation named "Rotate" for the cube object in my scene
```

```
Trigger the "Bounce" animation for the ball object
```

```
Create an onClick animation that makes an object move up when clicked
```

```
List all animations in my scene
```

## Animation Examples

### Creating a Simple Rotation Animation

```
Create an animation named "Spin" for object "cube-123" in scene "abc456" with keyframes for rotation
```

### Creating an Event-Based Animation

```
Create an onClick animation named "Grow" for object "button-123" in scene "abc456" that scales the object to 1.5x its size
```

### Triggering Animations

```
Trigger the "Pulse" animation for object "heart-123" in scene "abc456" with loop enabled
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
