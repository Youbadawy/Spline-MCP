import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

/**
 * A lightweight MCP (Model Control Protocol) server implementation
 * that replaces the private @anthropic-ai/mcp-server dependency
 */
export class McpServer {
  /**
   * Create a new MCP server
   * @param {Object} config - Server configuration
   * @param {string} config.name - Server name
   * @param {string} config.description - Server description
   * @param {string} config.version - Server version
   * @param {string} config.homepage - Server homepage URL
   * @param {Object} config.endpoints - Endpoint definitions
   */
  constructor(config) {
    this.config = config;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.port = process.env.PORT || 3000;
  }

  /**
   * Set up middleware for the Express app
   */
  setupMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  /**
   * Set up routes based on the endpoint definitions
   */
  setupRoutes() {
    // Add info route
    this.app.get('/', (req, res) => {
      res.json({
        name: this.config.name,
        description: this.config.description,
        version: this.config.version,
        homepage: this.config.homepage,
      });
    });

    // Add endpoint routes
    for (const [name, endpoint] of Object.entries(this.config.endpoints)) {
      this.app.post(`/api/${name}`, async (req, res) => {
        try {
          // Validate parameters
          const params = req.body;
          const validationResult = this.validateParams(params, endpoint.parameters);
          
          if (!validationResult.valid) {
            return res.status(400).json({
              error: validationResult.error,
            });
          }

          // Call handler
          const result = await endpoint.handler(params);
          res.json(result);
        } catch (error) {
          console.error(`Error in endpoint ${name}:`, error);
          res.status(500).json({
            error: error.message || 'Internal server error',
          });
        }
      });
    }

    // Add OpenAPI spec route
    this.app.get('/openapi.json', (req, res) => {
      res.json(this.generateOpenApiSpec());
    });
  }

  /**
   * Validate request parameters against endpoint parameter definitions
   * @param {Object} params - Request parameters
   * @param {Object} paramDefs - Parameter definitions
   * @returns {Object} Validation result
   */
  validateParams(params, paramDefs) {
    for (const [name, def] of Object.entries(paramDefs)) {
      if (params[name] === undefined) {
        if (!def.optional) {
          return { valid: false, error: `Required parameter '${name}' is missing` };
        }
        continue;
      }

      // Type validation
      if (def.type === 'string' && typeof params[name] !== 'string') {
        return { valid: false, error: `Parameter '${name}' must be a string` };
      } else if (def.type === 'number' && typeof params[name] !== 'number') {
        return { valid: false, error: `Parameter '${name}' must be a number` };
      } else if (def.type === 'object' && typeof params[name] !== 'object') {
        return { valid: false, error: `Parameter '${name}' must be an object` };
      }

      // Enum validation
      if (def.enum && !def.enum.includes(params[name])) {
        return { 
          valid: false, 
          error: `Parameter '${name}' must be one of: ${def.enum.join(', ')}` 
        };
      }
    }

    return { valid: true };
  }

  /**
   * Generate OpenAPI specification for the server
   * @returns {Object} OpenAPI specification
   */
  generateOpenApiSpec() {
    const paths = {};
    
    for (const [name, endpoint] of Object.entries(this.config.endpoints)) {
      paths[`/api/${name}`] = {
        post: {
          summary: endpoint.description,
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: Object.entries(endpoint.parameters).reduce((acc, [paramName, paramDef]) => {
                    acc[paramName] = {
                      type: paramDef.type,
                      description: paramDef.description,
                    };
                    if (paramDef.enum) {
                      acc[paramName].enum = paramDef.enum;
                    }
                    return acc;
                  }, {}),
                  required: Object.entries(endpoint.parameters)
                    .filter(([_, paramDef]) => !paramDef.optional)
                    .map(([paramName]) => paramName),
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful operation',
            },
            '400': {
              description: 'Invalid parameters',
            },
            '500': {
              description: 'Server error',
            },
          },
        },
      };
    }

    return {
      openapi: '3.0.0',
      info: {
        title: this.config.name,
        description: this.config.description,
        version: this.config.version,
      },
      paths,
    };
  }

  /**
   * Start the server
   */
  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`${this.config.name} is running on port ${this.port}`);
      console.log(`Server information available at http://localhost:${this.port}/`);
      console.log(`API endpoints available at http://localhost:${this.port}/api/*`);
      console.log(`OpenAPI specification available at http://localhost:${this.port}/openapi.json`);
    });
  }

  /**
   * Stop the server
   */
  stop() {
    if (this.server) {
      this.server.close();
      console.log(`${this.config.name} stopped`);
    }
  }
} 