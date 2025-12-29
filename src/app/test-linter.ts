// テスト用ファイル: Biome自動修復とTypeScriptエラー検出の確認

// 1. 自動修復可能: ダブルクォート → シングルクォート
const message = 'hello world'

// 2. 自動修復可能: セミコロン削除
const value = 42

// 3. 自動修復可能: let → const
const unused = 'should be const'

// 4. TypeScriptエラー: 型エラー（自動修復不可）
const num: number = 'not a number'

// 5. TypeScriptエラー: 存在しないプロパティ（自動修復不可）
const obj = { name: 'test' }
console.log(obj.nonExistent)

// 6. Biome警告: any型の使用
const data: any = { foo: 'bar' }

export { message, value, unused, num, obj, data }
