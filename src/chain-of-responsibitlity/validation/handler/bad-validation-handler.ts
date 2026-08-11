import type { ValidationExecutor } from "../executor/validation-executor.js";

/**
 * ## この実装の問題点
 * 
 * - `addExecutor()`でバリデーションチェーンを構築する
 * - `validate()`で構築したチェーンを実行する
 * - `getErrorMessage()`で結果を取得する
 * 
 * という3つの責務を持っているため、Builderとして見ると責務が過剰
 * 
 * よりBuilderらしくするなら、Builderと実行役を分離する方が良い
 */
export class ValidationHandler {
  private readonly executors: ValidationExecutor[] = [];
  private errorMessage: string = '';

  addExecutor(executor: ValidationExecutor): ValidationHandler {
    this.executors.push(executor);
    return this;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  validate(input: string): boolean {

    for (let executor of this.executors) {
      if (!executor.validate(input)) {
        this.errorMessage = executor.getErrorMessage();
        return false;
      }
    }

    return true;
  }
}