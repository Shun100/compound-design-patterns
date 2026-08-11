import type { ValidationExecutor } from "./validation-executor.js";

export class LengthValidationExecutor implements ValidationExecutor {
  private readonly MIN_LENGTH: number;

  constructor() {
    this.MIN_LENGTH = 12;
  }

  // @Override
  validate(input: string): boolean {
    const result = (input.length >= this.MIN_LENGTH);
    console.log(`LengthValidationの結果: ${result}`);
    return result;
  }

  // @Override
  getErrorMessage(): string {
    return `${this.MIN_LENGTH}文字以上で入力してください`;
  }
}