describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          console.log('this -> ', this);
          // 这里的this是在箭头函数里定义的，而此时箭头函数是在obj.say函数里，所以this指向obj
          // this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      console.log('this -> ', this);
      this.should.equal(null)
    }
    test()
  })

  // describe('bind', function () {
  //   it('bind undefined', function () {
  //     var obj = {
  //       say: function () {
  //         function _say() {
  //           // this 是什么？想想为什么？
  //           this.should.equal(null)
  //         }
  //         return _say.bind(obj)
  //       }()
  //     }
  //     obj.say()
  //   })

  //   it('bind normal', function () {
  //     var obj = {}
  //     obj.say = function () {
  //       function _say() {
  //         // this 是什么？想想为什么？
  //         this.should.equal(null)
  //       }
  //       return _say.bind(obj)
  //     }()
  //     obj.say()
  //   })
  // })
})
