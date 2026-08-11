import { LoggerDecorator } from "./logger-decorator.js";
import type { Logger } from "./logger.js";

// Decoratorのコンストラクタの型
type LoggerDecoratorConstructor<T extends unknown[] = []> =
  new (logger: Logger, ...args: T) => LoggerDecorator;

export class LoggerBuilder {
  /**
   * @constructor
   * @param { Logger } logger - 機能拡張元となるlogger
   */
  constructor(private logger: Logger) {}

  /**
   * 拡張機能追加
   * @param { LoggerDecoratorConstructor<T> } decorator - decoratorのコンストラクタ
   * @param { T } args - 追加の引数
   * @returns { LoggerBuilder } builder
   */
  addDecorator<T extends unknown[]>(
    decorator: LoggerDecoratorConstructor<T>,
    ...args: T
  ): LoggerBuilder {
    this.logger = new decorator(this.logger, ...args);
    return this;
  }

  /**
   * logger生成
   * @returns { Logger } logger
   */
  build(): Logger {
    return this.logger;
  }
}