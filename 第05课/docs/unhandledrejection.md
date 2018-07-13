当Promise被reject并且没有得到处理时，会触发`unhandledrejection`事件

## 继承

`unhandledrejection`继承自`PromiseRejectEvent`,  PromiseRejectEvent 又继承自 Event。因此，unhandledrejection含有PromiseRejectEvent和Event的属性和方法。

## demo

```js
window.addEventListener('unhandledrejection', function(event) {
  console.warn('Warning: Unhandled promise rejection. Shame on you ! Reason: ' + event.reason)
})
```

---

扩展阅读

## PromiseRejectionEvent

PromiseRejectionEvent接口表示出现在JS Promise被reject时触发的事件。这些事件对远程测试和调试特别有用。

构造函数:

PromiseRejectionEvent() 用给定的参数生成一个PromiseRejectionEvent事件

属性 - 也从它的父级Event继承属性

* PromiseRejectionEvent.promise[只读] 被rejected的 Promise
* PromiseRejectionEvent.reason[只读] 一个值或对象，表明为什么promise被rejected，并传递给Promise.reject()

方法 - 没有特定方法，从它的父级Event继承方法

事件

* unhandledrejection 在Promise被reject但是没有reject处理函数来处理时触发
* rejectionhandled 在Promise被reject时触发，reject后由Promise的reject处理函数处理
