// let fs = require('fs')

// const read = cb => {
//   fs.readFile('/book.txt', 'utf-8', (err, result) => {
//     if (err) return cb(err)
//     console.log('result', result)
//     cb(null, result)
//   })
// }

// module.exports = {
//   read
// }

let fs = require('fs')

exports.read = (cb) => {
  setTimeout(() => {
    fs.readFile('./book.txt', 'utf-8', (err, result) => {
      if (err) return cb(err)
      console.log('result', result)
      cb(null, result)
    })
  }, 2000)
}
