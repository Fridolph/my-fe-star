const assert = require('assert')

assert.ok(true)

assert.ok(1)

// [ERR_ASSERTION]: undefined == true
// assert.ok()

assert.ok(false, '不是真值');
// 抛出 AssertionError: 不是真值

// 在 repl 中：
assert.ok(typeof 123 === 'string');
// 抛出 AssertionError: false == true

// 在文件中（例如 test.js）：
assert.ok(typeof 123 === 'string');
// 抛出 AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(typeof 123 === 'string')
assert.ok(false);
// 抛出 AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(false)

assert.ok(0);
// 抛出 AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(0)

// 等同于 `assert()`：
assert(0);
// 抛出 AssertionError: The expression evaluated to a falsy value:
//
//   assert(0)
