/**
 * MCP Client utility to help interact with the Spline MCP server
 */

import axios from 'axios';

export class McpClient {
  /**
   * Create a new MCP client
   * @param {Object} options - Client options
   * @param {string} options.baseUrl - Base URL of the MCP server
   */
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:3000';
  }

  /**
   * Call an endpoint on the MCP server
   * @param {string} endpoint - Endpoint name
   * @param {Object} params - Parameters to pass to the endpoint
   * @returns {Promise<Object>} Response from the endpoint
   */
  async call(endpoint, params = {}) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/${endpoint}`, params);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Server error');
      } else {
        throw new Error(error.message || 'Network error');
      }
    }
  }

  /**
   * Get the server information
   * @returns {Promise<Object>} Server information
   */
  async getInfo() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Server error');
      } else {
        throw new Error(error.message || 'Network error');
      }
    }
  }

  /**
   * Get the OpenAPI specification
   * @returns {Promise<Object>} OpenAPI specification
   */
  async getOpenApiSpec() {
    try {
      const response = await axios.get(`${this.baseUrl}/openapi.json`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Server error');
      } else {
        throw new Error(error.message || 'Network error');
      }
    }
  }

  // Convenience methods for each endpoint

  /**
   * Export a Spline scene
   * @param {Object} params - Export parameters
   * @returns {Promise<Object>} Export result
   */
  async exportScene(params) {
    return this.call('exportScene', params);
  }

  /**
   * Import a 3D model into Spline
   * @param {Object} params - Import parameters
   * @returns {Promise<Object>} Import result
   */
  async importScene(params) {
    return this.call('importScene', params);
  }

  /**
   * Get details about a Spline scene
   * @param {Object} params - Scene parameters
   * @returns {Promise<Object>} Scene details
   */
  async getSceneDetails(params) {
    return this.call('getSceneDetails', params);
  }

  /**
   * List available Spline scenes
   * @param {Object} params - List parameters
   * @returns {Promise<Object>} List of scenes
   */
  async listScenes(params = {}) {
    return this.call('listScenes', params);
  }

  /**
   * Create a new animation
   * @param {Object} params - Animation parameters
   * @returns {Promise<Object>} Animation result
   */
  async createAnimation(params) {
    return this.call('createAnimation', params);
  }

  /**
   * Trigger an animation
   * @param {Object} params - Trigger parameters
   * @returns {Promise<Object>} Trigger result
   */
  async triggerAnimation(params) {
    return this.call('triggerAnimation', params);
  }

  /**
   * List animations in a scene
   * @param {Object} params - List parameters
   * @returns {Promise<Object>} List of animations
   */
  async listAnimations(params) {
    return this.call('listAnimations', params);
  }

  /**
   * Create an event-triggered animation
   * @param {Object} params - Event animation parameters
   * @returns {Promise<Object>} Animation result
   */
  async createEventAnimation(params) {
    return this.call('createEventAnimation', params);
  }
} 