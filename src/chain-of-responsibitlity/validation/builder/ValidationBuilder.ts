import { ValidationExecutor } from "../executor/validation-executor.js";
import { ValidationHandler } from "../handler/validation-handler.js";

export class ValidationBuilder {
  private readonly executors: ValidationExecutor[] = [];

  /**
   * executor追加
   * @param { ValidationExecutor } executor 
   * @returns { ValidationBuilder } builder
   */
  addExecutor(executor: ValidationExecutor): ValidationBuilder {
    this.executors.push(executor);
    return this;
  }

  /**
   * handler生成
   * @returns { ValidationHandler } handler
   */
  build(): ValidationHandler {
    return new ValidationHandler([...this.executors]);
  }
}