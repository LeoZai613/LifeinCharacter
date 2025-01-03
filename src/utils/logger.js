const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

const isDebugEnabled = () => {
  return process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG === 'true';
};

const formatLogMessage = (level, message, details = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    ...details
  };
};

export const log = (level, message, details = {}) => {
  if (!LOG_LEVELS[level.toUpperCase()]) {
    console.warn('Invalid log level:', level);
    level = LOG_LEVELS.INFO;
  }

  const logLevel = level.toLowerCase();

  // In production, only log warnings and errors
  if (process.env.NODE_ENV === 'production' && !['warn', 'error'].includes(logLevel)) {
    return;
  }

  // In development or when debug is enabled, log everything
  if (isDebugEnabled() || ['warn', 'error'].includes(logLevel)) {
    const formattedMessage = formatLogMessage(level, message, details);
    console[logLevel](formattedMessage);
  }
};

export const logGroup = (groupName, callback) => {
  if (isDebugEnabled()) {
    console.group(groupName);
    callback((...args) => log(...args));
    console.groupEnd();
  } else {
    callback((...args) => log(...args));
  }
};

export default {
  debug: (message, details) => log(LOG_LEVELS.DEBUG, message, details),
  info: (message, details) => log(LOG_LEVELS.INFO, message, details),
  warn: (message, details) => log(LOG_LEVELS.WARN, message, details),
  error: (message, details) => log(LOG_LEVELS.ERROR, message, details),
  group: logGroup
};
