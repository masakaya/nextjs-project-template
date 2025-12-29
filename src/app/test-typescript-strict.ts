// テスト用ファイル: TypeScript厳格設定の確認

// 1. noUncheckedIndexedAccess: 配列アクセス時のundefinedチェック
const items = ['a', 'b', 'c']
const first = items[0] // この時点でstring | undefinedになる
console.log(first.toUpperCase()) // エラー: undefinedの可能性

// 2. noUncheckedIndexedAccess: オブジェクトアクセス
const record: Record<string, number> = { a: 1, b: 2 }
const value = record['a'] // number | undefined
console.log(value.toFixed(2)) // エラー: undefinedの可能性

// 3. noImplicitReturns: 暗黙のreturnなし
function getValue(condition: boolean): string {
  if (condition) {
    return 'yes'
  }
  // エラー: falseの場合returnがない
}

// 4. 型エラー: 基本的な型不一致
const num: number = 'string'

export { items, record, getValue, num }
