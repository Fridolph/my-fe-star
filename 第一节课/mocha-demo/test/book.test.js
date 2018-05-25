// const {read} = require('../book')
// const should = require('should')

// describe('async', () => {
//   it('read book async', done => {
//     read((err, result) => {
//       err.should.be.equal(null)
//       result.should.to.be.a('string')
//       done()
//     })
//   })
// })

const book = require('../book')
const expect = require('chai').expect

describe('async', () => {
  it('read book async', done => {
    book.read((err, result) => {
      expect(err).to.equal(null)
      expect(result).to.be.a('string')
      done()
    })
  })
})
