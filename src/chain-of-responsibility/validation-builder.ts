import type { ValidationHandler } from "./validation-handler.js";

export class ValidationBuilder {
  private handlers: ValidationHandler[] = [];

  addHandler(handler: ValidationHandler): this {
    this.handlers.push(handler);
    return this;
  }

  build(): ValidationHandler {
    if (this.handlers.length === 0) {
      throw new Error('Handlerが登録されていません。');
    }

    /*
     * 最後にreturn currentしているので、最終的な戻り値はMinLengthValidationHandlerになる。
     * しかし、build()で返したいのはチェーンの最後ではなく、**チェーンの先頭であるNotNullValidationHandler**のため、
     * 明示的に先頭の要素を返している。
     */
    this.handlers.reduce((previous, current) => {
      previous.setNext(current);
      return current;
    });

    return this.handlers[0]!;
  }
}