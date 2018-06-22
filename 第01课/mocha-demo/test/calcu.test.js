const {add} = require('../calcu')
const should = require('should')

describe('add func test', () => {
  it('2 + 2 = 4', () => {
    add(2, 2).should.equal(4)
  })
})
