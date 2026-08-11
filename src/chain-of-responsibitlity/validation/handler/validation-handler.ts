import type { ValidationExecutor } from "../executor/validation-executor.js";

export class ValidationHandler {

  /**
   * @constructor
   * @param { ValidationExecutor[] } executors
   */
  constructor(private readonly executors: ValidationExecutor[]) {}

  /**
   * Validation実行
   * @param { string } input
   * @returns { isValid: boolean, errorMessage: string | null } result 
   */
  validate(input: string): { isValid: boolean, errorMessage: string | null } {
    for (const executor of this.executors) {
      if (!executor.validate(input)) {
        return { isValid: false, errorMessage: executor.getErrorMessage() };
      }
    }

    return { isValid: true, errorMessage: null };
  }
}