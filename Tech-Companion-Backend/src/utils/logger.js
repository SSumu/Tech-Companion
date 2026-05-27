import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logs directory
const logsDir = path.join(__dirname, "../../logs");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const errorLogPath = path.join(logsDir, "error.log");
const combinedLogPath = path.join(logsDir, "combined.log");

// Current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Write logs to file
const writeToFile = (filePath, message) => {
  fs.appendFileSync(filePath, message + "\n", "utf8");
};

// General logger
export const logger = (message) => {
  const logMessage = `[${getTimestamp()}] INFO: ${message}`;

  console.log(logMessage);

  writeToFile(combinedLogPath, logMessage);
};

// Error logger
export const errorLogger = (message) => {
  const logMessage = `[${getTimestamp()}] ERROR: ${message}`;

  console.error(logMessage);

  writeToFile(errorLogPath, logMessage);
  writeToFile(combinedLogPath, logMessage);
};

// Request logger middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const logMessage =
      `[${getTimestamp()}]` +
      `${req.method} ${req.originalUrl}` +
      `${res.statusCode} - ${duration}ms`;

    console.log(logMessage);

    writeToFile(combinedLogPath, logMessage);
  });

  next();
};
