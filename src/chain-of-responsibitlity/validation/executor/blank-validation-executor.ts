import type { ValidationExecutor } from "./validation-executor.js";

export class BlankValidationExecutor implements ValidationExecutor {
  
  // Override
  validate(input: string): boolean {
    const result = (input !== null && input !== '');
    console.log(`BlankValidationの結果: ${result}`);
    return result;
  }

  // @Override
  getErrorMessage(): string {
    return '入力必須です';
  }
}