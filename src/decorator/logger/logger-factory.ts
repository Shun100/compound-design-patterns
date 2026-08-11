import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { LogLevel, type Loggers } from "./types.js";
import { LoggerBuilder } from "./logger-builder.js";
import { FileLogger, LevelLogger, TimestampLogger, LineNumberLogger } from "./logger-decorator.js";
import { ConsoleLogger, type Logger } from "./logger.js";

export class LoggerFactory {
  // Singleton
  private static factory: LoggerFactory | null = null;
  
  private readonly loggers: Loggers;

  private constructor(baseLogger: Logger) {
    const configFilePath = resolve('src/decorator', "config.json");
    const logFilePath = JSON.parse(readFileSync(configFilePath, "utf8")).logger.filePath;

    this.loggers = {
      debugLogger: this.createLogger(LogLevel.DEBUG, baseLogger, logFilePath),
      infoLogger: this.createLogger(LogLevel.INFO, baseLogger, logFilePath),
      warnLogger: this.createLogger(LogLevel.WARN, baseLogger, logFilePath),
      errorLogger: this.createLogger(LogLevel.ERROR, baseLogger, logFilePath)
    }
  }

  static getLogger(): Loggers {
    if (!LoggerFactory.factory) {
      const baseLogger = new ConsoleLogger();
      LoggerFactory.factory = new LoggerFactory(baseLogger);
    }
    return LoggerFactory.factory.loggers;
  }

  private createLogger(level: string, logger: Logger, filePath: string): Logger {
    return new LoggerBuilder(logger)
      .addDecorator(FileLogger, filePath)
      .addDecorator(LevelLogger, level)
      .addDecorator(TimestampLogger)
      .addDecorator(LineNumberLogger)
      .build();
  }
}