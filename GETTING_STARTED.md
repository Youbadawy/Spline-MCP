# Getting Started with Spline MCP Server

This guide is designed for beginners who want to use the Spline MCP Server to connect AI assistants with Spline 3D design software.

## What Does This Do?

The Spline MCP Server acts as a bridge between AI assistants (like Claude, GPT, etc.) and the Spline 3D design tool. With this bridge in place, you can ask your AI assistant to help you with 3D design tasks in Spline, such as:

- Listing your Spline projects
- Exporting 3D models in different formats
- Creating animations for 3D objects
- And much more!

## Step-by-Step Setup Guide

### Step 1: Install Node.js

Node.js is required to run this server:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS (Long Term Support) version
3. To verify it's installed, open a command prompt/terminal and type: `node -v`
   - You should see a version number like `v16.15.0`

### Step 2: Get the Spline MCP Server

1. Open a command prompt/terminal
2. Navigate to a folder where you want to store the project
3. Run these commands:
   ```
   git clone https://github.com/Youbadawy/Spline-MCP.git
   cd Spline-MCP
   npm install
   ```

If you're not familiar with git, you can also:
1. Go to https://github.com/Youbadawy/Spline-MCP
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file
5. Open a command prompt/terminal in the extracted folder
6. Run `npm install`

### Step 3: Get a Spline API Key

1. Create an account at [spline.design](https://spline.design) if you don't have one
2. Log in to your account
3. Go to your account settings
4. Look for the API section to generate an API key
5. Copy the API key

### Step 4: Configure the Server

1. In the Spline-MCP folder, create a file named `.env`
2. Open the file in a text editor and add:
   ```
   SPLINE_API_KEY=your_api_key_here
   SPLINE_API_URL=https://api.spline.design
   ```
3. Replace `your_api_key_here` with the API key you copied in Step 3
4. Save the file

### Step 5: Start the Server

1. In the command prompt/terminal, make sure you're in the Spline-MCP folder
2. Run: `npm start`
3. You should see a message saying the server is running on port 3000

### Step 6: Connect to an AI IDE

#### For Cursor AI:

1. With the server running, create an `mcp_config.json` file in your project folder (it should already exist in the repo)
2. In Cursor, press Ctrl+Shift+P (or Cmd+Shift+P on Mac)
3. Select "Connect to MCP Server"
4. Choose "Local" and select your `mcp_config.json` file

#### For Claude Web:

1. With the server running, open Claude in your web browser
2. Tell Claude about the Spline API: "I'm running a Spline MCP server at http://localhost:3000. Can you help me use it?"
3. Share the OpenAPI spec URL: `http://localhost:3000/openapi.json`

## What Can I Ask the AI to Do?

Once connected, you can ask your AI assistant to:

- "List my available Spline scenes"
- "Export my Spline scene with ID 'abc123' to GLB format"
- "Create an animation that makes the cube spin"
- "Import a 3D model from this URL into my Spline project"

## Troubleshooting

### The server won't start

- Make sure Node.js is installed correctly
- Make sure you ran `npm install` in the project folder
- Check that your `.env` file is set up correctly

### The AI can't connect to the server

- Make sure the server is running (you should see messages in the terminal)
- Check that you can access http://localhost:3000 in your web browser
- Verify that your MCP configuration has the correct URL

### The AI is connected but operations fail

- Check that your Spline API key is valid
- Look at the error messages in the terminal where the server is running
- Make sure you have the necessary permissions in Spline

## Need More Help?

If you're stuck, check the main [README.md](README.md) for more detailed information, or open an issue on the [GitHub repository](https://github.com/Youbadawy/Spline-MCP/issues). 