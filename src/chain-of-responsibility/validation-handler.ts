/**
 * Chain-of-Responsibility
 * 
 * - A: Handler
 * - C: ConcreteHandler
 * 
 * - dependency
 *  - ConcreteHandler --> Handler
 */

export abstract class ValidationHandler {
  private nextHandler: ValidationHandler | null = null;

  setNext(handler: ValidationHandler): void {
    this.nextHandler = handler;
  }

  protected abstract execValidation(input: string): boolean;
  protected abstract showErrorMessage(): void;

  validate(input: string): boolean {
    const result = this.execValidation(input);
    if (!result) {
      this.showErrorMessage();
    }
    return (this.nextHandler?.validate(input) && result) ?? result;
  }
}

export class NotNullValidationHandler extends ValidationHandler {
  protected execValidation(input: string): boolean {
    const result = input ? true : false;
    console.log(`NotNullValidationの結果: ${result}`);
    return result;
  }

  protected showErrorMessage() {
    console.error('何も入力されていません。');
  }
}

export class AlphabetValidationHandler extends ValidationHandler {
  protected execValidation(input: string): boolean {
    const reg = new RegExp(/^[a-zA-Z]+$/);
    const result = reg.test(input);
    console.log(`AlphabetValidationの結果: ${result}`);
    return result;
  }

  protected showErrorMessage(): void {
    console.error('半角英字のみで入力してください。');
  }
}

export class MinLengthValidationHandler extends ValidationHandler {
  protected execValidation(input: string): boolean {
    const result = input.length >= 8;
    console.log(`MinLengthValidationHandlerの結果: ${result}`);
    return result;
  }

  protected showErrorMessage(): void {
    console.error('8文字以上で入力してください。');
  }
}