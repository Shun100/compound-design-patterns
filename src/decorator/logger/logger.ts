// 機能拡張元のAPI
export interface Logger {
  log(message: string): void;
}

// 機能拡張元のクラス
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}