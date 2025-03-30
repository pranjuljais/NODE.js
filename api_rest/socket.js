let io;

module.exports = {
  init: (httpServer) => {
    // Correct way to initialize Socket.IO with CORS
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000", // Allow frontend origin
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Optional, for cookies/auth
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
