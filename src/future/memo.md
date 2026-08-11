# Futureパターン

## Components

- `Client`: Futureを受け取り、必要なタイミングで結果を取得する
- `Service`: 非同期処理を開始し、すぐにFutureを返す
- `Worker`: バッググラウンドで処理を行い、完了したらFutureへ結果を設定する
- `Future`: 処理結果を保持し、利用者が後から取得できるようにする

## Sequence Diagram

```mermaid
sequenceDiagram
  participant Client
  participant Service
  participant Future
  participant Worker

  Client->>Service: fetchData()

  Service->>Future: Futureを生成
  Service->>Worker: 非同期処理開始
  Service-->>Client: Futureを返却

  Note over Client: 他の処理を実行

  Worker->>Worker: データ取得・計算

  Worker->>Future: setResult(result)

  Client->>Future: get()
  alt 結果が未完成
      Future-->>Client: 完了まで待機
  else 結果が完成済み
      Future-->>Client: result
  end
```

## Class Diagram

```mermaid
classDiagram
  class Client {
      +main()
  }

  class DataService {
      +fetchData(): Future~string~
  }

  class Future~T~ {
      -result: T
      -completed: boolean
      -callbacks: Callback[]
      +get(): Promise~T~
      +setResult(value: T): void
      +isDone(): boolean
  }

  class Worker {
      +run(future: Future~string~): void
  }

  Client --> DataService : request
  Client --> Future~string~ : get()
  DataService --> Future~string~ : create
  DataService --> Worker : start
  Worker --> Future~string~ : setResult()
```
