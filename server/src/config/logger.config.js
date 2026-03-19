const winston = require("winston");
const { format, transports } = winston;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
  format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}] ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  }),
);

// Define transports
const consoleTransport = new transports.Console({
  format: format.combine(format.colorize({ all: true }), customFormat),
});

const fileTransport = new transports.File({
  filename: "logs/error.log",
  level: "error",
  format: customFormat,
});

// Create the logger
const logger = winston.createLogger({
  levels: customLevels.levels,
  format: customFormat,
  transports: [consoleTransport, fileTransport],
});

// Add colors to Winston (optional)
winston.addColors(customLevels.colors);

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}

module.exports = logger;
