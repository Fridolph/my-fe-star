const expect = require('chai').expect
const request = require('supertest')

describe('api', () => {
  it('get baidu infomation', done => {
    request('https://www.baidu.com')
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        expect(err).to.be.a('null')
        expect(res).to.be.a('object')
        done()
      })
  })
})
