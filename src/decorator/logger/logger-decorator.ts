import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { Logger } from "./logger.js";

// 機能拡張のためのAPI
export abstract class LoggerDecorator implements Logger {
  constructor(protected readonly logger: Logger) {}

  abstract log(message: string): void;
}

// 機能拡張クラス
export class LevelLogger extends LoggerDecorator {
  constructor(
    logger: Logger,
    private readonly level: string
  ) {
    super(logger);
  }

  log(message: string): void {
    this.logger.log(`[${this.level}] ${message}`);
  }
}

// 機能拡張クラス
export class TimestampLogger extends LoggerDecorator {
  log(message: string): void {
    const timestamp = new Date().toLocaleString('ja-JP');
    this.logger.log(`[${timestamp}] ${message}`);
  }
}

// 機能拡張クラス
export class FileLogger extends LoggerDecorator {
  constructor(
    logger: Logger,
    private readonly filePath: string
  ) {
    super(logger);
  }

  log(message: string): void {
    this.logger.log(message);

    // ファイルに出力
    mkdirSync(dirname(this.filePath), { recursive: true });
    appendFileSync(this.filePath, message + '\n', 'utf8');
  }
}

// 機能拡張クラス
export class MethodNameLogger extends LoggerDecorator {
  log(message: string): void {
    const methodName = this.getCallerMethodName();

    this.logger.log(`[${methodName}] ${message}`);
  }

  private getCallerMethodName(): string {
    const stack = new Error().stack;

    if (!stack) {
      return 'unknown';
    }

    const lines = stack.split("\n");

    // Error
    // at getCallerMethodName (...)
    // at MethodNameLogger.log (...)
    // at UserService.createUser (...)
    const caller = lines[3];

    if (!caller) {
      return "unknown";
    }

    const match = caller.match(/at (.+?) \(/);

    return match?.[1] ?? "unknown";
  }
}

// 機能拡張クラス
export class LineNumberLogger extends LoggerDecorator {
  log(message: string): void {
    const caller = this.getCaller();

    if (caller) {
      this.logger.log(
        `[${caller.file}:${caller.line}] ${message}`,
      );
      return;
    }

    this.logger.log(message);
  }

  private getCaller(): {
    file: string;
    line: number;
  } | undefined {
    const stack = new Error().stack;

    if (!stack) {
      return undefined;
    }

    const lines = stack.split("\n");

    // Error
    // at LineNumberLogger.getCaller (...)
    // at LineNumberLogger.log (...)
    // at UserService.createUser (...)
    const caller = lines[3];

    if (!caller) {
      return undefined;
    }

    const match = caller.match(
      /at (.+?) \((.+):(\d+):(\d+)\)/,
    );

    if (!match) {
      return undefined;
    }

    return {
      file: match[2]!,
      line: Number(match[3]),
    };
  }
}