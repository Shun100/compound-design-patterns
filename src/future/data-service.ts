import { Future } from "./future";

export class DataService {
  fetchData(): Future<string> {
    const future = new Future<string>();

    console.log('データ取得開始');

    setTimeout(() => {
      console.log('データ取得完了');
      future.setResult('Hello Future Pattern');
    }, 3000);

    return future;
  }
}