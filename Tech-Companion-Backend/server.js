import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import http from "http";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Create HTTP Server
    const server = http.createServer(app);

    // Start Server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Rejection:", err.message);

      server.close(() => {
        process.exit(1);
      });
    });

    // Handle Uncaught Exceptions
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err.message);

      process.exit(1);
    });

    // Graceful Shutdown
    process.on("SIGINT", () => {
      console.log("\n🛑 Gracefully shutting down...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
