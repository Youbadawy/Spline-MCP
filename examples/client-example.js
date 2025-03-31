/**
 * Example of using the Spline MCP client
 */

import { McpClient } from '../src/utils/mcpClient.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a client
const client = new McpClient({
  baseUrl: 'http://localhost:3000',
});

async function run() {
  try {
    // Get server info
    console.log('Getting server info...');
    const info = await client.getInfo();
    console.log('Server info:', info);
    
    // List scenes
    console.log('\nListing scenes...');
    const scenes = await client.listScenes({ limit: 5 });
    console.log('Scenes:', scenes);
    
    // If you have a scene ID, you can get its details
    if (scenes.scenes && scenes.scenes.length > 0) {
      const sceneId = scenes.scenes[0].id;
      
      console.log(`\nGetting details for scene ${sceneId}...`);
      const details = await client.getSceneDetails({ sceneId });
      console.log('Scene details:', details);
      
      // List animations in the scene
      console.log(`\nListing animations for scene ${sceneId}...`);
      const animations = await client.listAnimations({ sceneId });
      console.log('Animations:', animations);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run(); 