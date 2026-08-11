import type { ValidationExecutor } from "./validation-executor.js";

export class AlphabetValidationExecutor implements ValidationExecutor {
  
  // @Override
  validate(input: string): boolean {
    const reg = new RegExp(/^[a-zA-Z]+$/);
    const result = reg.test(input);
    console.log(`AlphabetValidationの結果: ${result}`);
    return result;
  }

  // @Override
  getErrorMessage(): string {
    return '英字のみで入力してください';
  }
}