const assert = require('assert')

// assert.deepStrictEqual({a: 1}, {a: '1'})
const date = new Date()
const object = {}
const fakeDate = {}
Object.setPrototypeOf(fakeDate, Date.prototype)

// assert.deepStrictEqual(object, fakeDate)
// assert.deepStrictEqual(date, fakeDate)
// assert.deepStrictEqual(NaN, NaN)
// assert.deepStrictEqual(new Number(1), new Number(2))
// assert.deepStrictEqual(new String('foo'), Object('foo'))
// assert.deepStrictEqual(-0, -0)
// const symbol1 = Symbol()
// const symbol2 = Symbol()
// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 })
// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 })

const weakMap1 = new WeakMap()
const weakMap2 = new WeakMap([[{}, {}]])
const weakMap3 = new WeakMap()
weakMap3.unequal = true
assert.deepStrictEqual(weakMap1, weakMap2)
assert.deepStrictEqual(weakMap1, weakMap3)
