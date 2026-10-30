/**
 * Decoratorパターン
 * - I: Component
 * - C: ConcreteComponent (Logger)
 * - A: Decorator
 * - C: ConcreteDecorator (TimestampDecorator, LogLevelDecorator)
 * 
 * - dependencies
 *  - ConcreteComponent --> Component
 *  - Decorator --> Component
 *  - ConcreteDecorator --> Decorator
 */

export interface Component {
  getLogMessage(msg: string): string;
}

export class Logger implements Component {
  getLogMessage(msg: string): string {
    return msg;
  }
}

export abstract class Decorator implements Component {
  // Composition
  constructor(protected component: Component) {}

  abstract getLogMessage(msg: string): string;
}

export class TimestampDecorator extends Decorator {
  getLogMessage(msg: string): string {
    const date = new Date();
    const timestamp = date.toLocaleString('ja-JP');
    return this.component.getLogMessage(`${timestamp} ${msg}`);
  }
}

export class LogLevelDecorator extends Decorator {
  constructor(component: Component, private logLevel: string) {
    super(component);
  }

  getLogMessage(msg: string): string {
    return this.component.getLogMessage(`${this.logLevel} ${msg}`);
  }
}

