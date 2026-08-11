export class Future<T> {
  private result?: T;
  private completed: boolean = false;

  /**
   * Futureが完了したことを待機中の利用者に通知するためのコールバックを保持する
   * コールバック関数の実体はPromiseの`resolve`関数
   */
  private notifyCallbacks: Array<(value: T) => void> = [];

  /**
   * Futureを完了状態にし、処理結果を設定する
   *
   * 設定された結果は内部に保持され、登録済みのコールバックへ通知される
   * このメソッドは一度だけ呼び出すことができ、完了済みのFutureに対して
   * 再度呼び出すと例外を送出する
   *
   * @param { T } value - 非同期処理の結果
   * @throws { Error } error - Futureが既に完了している場合
   */
  setResult(value: T): void {
    if (this.completed) {
      throw new Error('Result has already been set.');
    }

    this.result = value;
    this.completed = true;
    
    for (const notify of this.notifyCallbacks) {
      notify(value);
    }

    this.notifyCallbacks = [];
  }

  /**
   * Futureの処理結果を取得する
   * 
   * @returns { Promise<T> } result - 処理結果を表すPromise
   */
  get(): Promise<T> {
    return this.completed
      ? Promise.resolve(this.result!)
      : new Promise((resolve => this.notifyCallbacks.push(resolve))); // setResultが呼ばれるまではpending
  }

  /**
   * Futureが完了してるかどうか
   * 
   * @returns { boolean } completed 
   */
  isDone(): boolean {
    return this.completed;
  }
}