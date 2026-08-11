import { DataService } from './data-service';

async function main() {
  const service = new DataService();

  const future = service.fetchData(); // 時間のかかる処理を非同期実行
  
  // その間に別の処理を進める
  console.log('別の処理を実行中...');
  for (let i = 1; i <= 5; i++) {
    console.log(`タスク ${i}`);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('結果待ち...');

  // 非同期実行した処理の結果を取得する
  const result = await future.get();
  console.log(result);
}

main();