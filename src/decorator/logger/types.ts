import type { Logger } from "./logger.js";

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export type Loggers = {
  debugLogger: Logger,
  infoLogger: Logger,
  warnLogger: Logger,
  errorLogger: Logger
}