# compound-design-patterns

複数のデザインパターンを組み合わせた複合的な実装例をまとめる

## TypeScriptの環境構築方法

```bash
  <!-- Nodeプロジェクト作成 -->
  npm init -y

  <!-- TypeScriptとtsxのインストール -->
  npm install -D typescript tsx @types/node

  <!-- tsconfig作成 -->
  npx tsc --init
```

- `package.json`の`"type"`を`"module"`に変更
- `package.json`の`scripts`に`"start": "tsx"`を追加

## 実行手順

```bash
  <!-- ライブラリをインストール -->
  npm install

  <!-- ビルド・実行 -->
  npm start hoge.ts
```
