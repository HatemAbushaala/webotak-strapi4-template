const fs = require("fs/promises");
const path = require("path");

module.exports = {
  async getTypesFile(ctx) {
    if (process.env.NODE_ENV !== "development") return ctx.forbidden();

    const { ...query } = ctx.request.query;

    const file = await fs.readFile(
      path.join(process.cwd(), "./types/generated/contentTypes.d.ts"),
      "utf-8"
    );
    return file;
  },
  /**
   * Get all custom routes organized by API
   * Returns routes in an AI-friendly format with detailed information
   */
  async getAllRoutes(ctx) {
    if (process.env.NODE_ENV !== "development") return ctx.forbidden();

    try {
      const apiPath = path.join(process.cwd(), "src/api");
      const apis = await fs.readdir(apiPath);

      const routesData = {
        metadata: {
          project: "Vouchers Strapi",
          generatedAt: new Date().toISOString(),
          description: "All custom API routes organized by API name",
        },
        apis: [],
      };

      // Process each API directory
      for (const apiName of apis) {
        if (apiName === ".gitkeep") continue;

        const apiDir = path.join(apiPath, apiName);
        const stats = await fs.stat(apiDir);

        if (!stats.isDirectory()) continue;

        const routesDir = path.join(apiDir, "routes");

        // Check if routes directory exists
        try {
          await fs.access(routesDir);
        } catch {
          continue;
        }

        const routeFiles = await fs.readdir(routesDir);
        const apiRoutes = {
          apiName,
          routes: [],
        };

        // Read all route files for this API
        for (const routeFile of routeFiles) {
          if (!routeFile.endsWith(".js")) continue;

          const routeFilePath = path.join(routesDir, routeFile);
          const routeContent = await fs.readFile(routeFilePath, "utf-8");

          // Parse the route file
          try {
            // Clear require cache to get fresh data
            delete require.cache[require.resolve(routeFilePath)];
            const routeModule = require(routeFilePath);

            if (routeModule.routes && Array.isArray(routeModule.routes)) {
              routeModule.routes.forEach((route) => {
                const routeInfo = {
                  method: route.method,
                  path: route.path,
                  // authentication: route.config?.auth === false ? 'none' : 'required',
                  // roles: route.config?.roles || [],
                  description: this.extractDescription(
                    routeContent,
                    route.path
                  ),
                };
                apiRoutes.routes.push(routeInfo);
              });
            }
          } catch (error) {
            console.error(`Error parsing route file ${routeFile}:`, error);
          }
        }

        if (apiRoutes.routes.length > 0) {
          routesData.apis.push(apiRoutes);
        }
      }

      // Sort APIs alphabetically
      routesData.apis.sort((a, b) => a.apiName.localeCompare(b.apiName));

      // Generate AI-friendly documentation
      const documentation = this.generateAIDocumentation(routesData);

      return {
        ...routesData,
        aiDocumentation: documentation,
      };
    } catch (error) {
      console.error("Error getting routes:", error);
      return ctx.badRequest("Failed to retrieve routes", {
        error: error.message,
      });
    }
  },

  /**
   * Extract description from comments in route file
   */
  extractDescription(fileContent, routePath) {
    // Try to find comments near the route definition
    const lines = fileContent.split("\n");
    let description = "";

    lines.forEach((line, index) => {
      if (line.includes(routePath)) {
        if (index > 0 && lines[index - 1].includes("//")) {
          description = lines[index - 1].replace(/\/\/\s*/, "").trim();
        } else if (index > 1 && lines[index - 2].includes("//")) {
          description = lines[index - 2].replace(/\/\/\s*/, "").trim();
        }
      }
    });

    return description;
  },

  /**
   * Generate AI-friendly documentation
   */
  generateAIDocumentation(routesData) {
    let doc = `# Vouchers Strapi API Routes Documentation\n\n`;
    doc += `Generated at: ${routesData.metadata.generatedAt}\n\n`;
    doc += `## Overview\n\n`;
    doc += `This document describes all custom API routes in the Vouchers Strapi project.\n`;
    doc += `Each route includes method, path, authentication requirements, and role permissions.\n\n`;

    routesData.apis.forEach((api) => {
      doc += `## API: ${api.apiName}\n\n`;
      doc += `Total routes: ${api.routes.length}\n\n`;

      api.routes.forEach((route) => {
        doc += `### ${route.method} ${route.path}\n\n`;
        // doc += `- **Authentication**: ${route.authentication}\n`

        // if (route.roles.length > 0) {
        // 	doc += `- **Required Roles**: ${route.roles.join(', ')}\n`
        // }

        if (route.description) {
          doc += `- **Description**: ${route.description}\n`;
        }

        doc += `\n`;
      });

      doc += `---\n\n`;
    });

    return doc;
  },
};
