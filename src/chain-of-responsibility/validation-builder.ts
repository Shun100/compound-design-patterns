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

    this.handlers.reduce((previous, current) => {
      previous.setNext(current);
      return current;
    });

    return this.handlers[0]!;
  }
}