const app = require("./server.js");

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */

// Get port from environment and store in Express.
const port = Number(process.env.PORT || "5000");
app.set("port", port);

// Create HTTP server.
const server = app.listen(port, () => {
  console.log(
    `Server is running at http://localhost:${port} in mode`,
    `${port}`,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = server;
