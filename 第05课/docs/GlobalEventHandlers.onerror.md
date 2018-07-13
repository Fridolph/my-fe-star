# GlobalEventHandlers.onerror

error事件的事件处理程序。针对各种目标的不同类型的错误触发Error事件：

* 当JS运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的error事件，并执行`window.onerror()`
* 当一项资源（如img或script）加载失败，加载资源的元素会触发一个Event接口的error事件，并执行该元素上的`onerror()`处理函数。这些error事件不会向上冒泡到window，不过能被单一的window.addEventListener捕获

加载一个全局的error事件处理函数可用于自动收集错误报告

## 语法

因历史原因，`window.onerror`和`element.onerror`接受不同的参数

### window.onerror

    window.onerror = function(message, source, lineno, colno, error) { /*...*/ }

函数参数：

* message: String 错误信息。可用于HTML `onerror=""`处理程序中的event
* source: String 发生错误的脚本url
* lineno: Number 发生错误的行号
* colno: Number 发生错误的序号
* error: <Error, Object> Error对象

若该函数返回true，则阻止执行默认事件处理函数

### window.addEventListener('error')

ErrorEvent类型的event包含有关事件和错误的所有信息

### element.onerror

    element.onerror = function(event) {...}

element.onerror使用单一Event参数的函数作为其他处理函数

## 注意事项

当加载自不同域的脚本发生语法错误时，为避免信息泄漏，语法错误的细节将不会报告，而代之简单的“Script error”。在某些浏览器中，通过在`<script>`使用crossorigin属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。一个变通方案是单独处理"Script error."，告知错误详情仅能通过浏览器控制台查看，无法通过JavaScript访问。

```js
window.onerror = function(msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase()
  var substring = 'script error'

  if (string.indexOf(substring) > -1) {
    alert('Script Error: See Browser Console for Detail')
  } else {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ')
    alert(message)
  }
  return false
}
```

当使用行内HTML标签（<body onerror="alert('an error occurred')">）时，HTML规范要求传递给onerror的参数命名为event、source、lineno、colno、error。针对不满足此要求的浏览器，传递的参数仍可使用arguments[0]到arguments[2]来获取。

---

博客 - 使用window.onerror捕获并报告JavaScript错误

## Capture and report JavaScript errors with window.onerror

onerror是一个特殊的浏览器事件，只要抛出未捕获的JavaScript错误就会触发该事件。这是记录客户端错误并将其报告给服务器的最简单方法之一。它也是Sentry的客户端JavaScript集成（raven-js）工作的主要机制之一。

你通过向window.onerror分配一个函数来监听onerror事件：

```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  // ... handle error ...
  return false;
}
```

抛出错误时，以下参数将传递给函数：

* msg - 与错误相关的消息，例如“未捕获的ReferenceError：foo未定义”
* url - 与错误关联的脚本或文档的URL，例如“/dist/app.js”
* lineNo - 行号（如果有）
* columnNo - 列号（如果可用）
* error - 与此错误关联的Error对象（如果可用）

前四个参数告诉您错误发生在哪个脚本，行和列中。最后一个参数Error对象可能是最有价值的。让我们来了解原因。

### Error对象和error.stack

乍一看，Error对象不是很特别。它包含3个标准化属性：message，fileName和lineNumber。已通过window.onerror提供给您的冗余值。

有价值的部分是非标准属性：Error.prototype.stack。此堆栈属性告诉您错误发生时程序的每个帧的源位置。错误堆栈跟踪可能是调试的关键部分。尽管不标准，但每个现代浏览器都提供此属性。

以下是Chrome 46中Error对象的堆栈属性的示例：

```js
"Error: foobar\n    at new bar (<anonymous>:241:11)\n    at foo (<anonymous>:245:5)\n    at <anonymous>:250:5\n    at <anonymous>:251:3\n    at <anonymous>:267:4\n    at callFunction (<anonymous>:229:33)\n    at <anonymous>:239:23\n    at <anonymous>:240:3\n    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)\n    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)"
```

难以阅读，对吗？stack属性实际上只是一个未格式化的字符串。这是格式化的样子：

```js
"Error: foobar
    at new bar (<anonymous>:241:11)
    at foo (<anonymous>:245:5)
    at <anonymous>:250:5
    at <anonymous>:251:3
    at <anonymous>:267:4
    at callFunction (<anonymous>:229:33)
    at <anonymous>:239:23
    at <anonymous>:240:3
    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)
    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)"
```

一旦格式化，就很容易看出堆栈属性如何在帮助调试错误时起到关键作用。只有一个障碍：堆栈属性是非标准的，它的实现在浏览器之间有所不同。例如，这是来自Internet Explorer 11的相同堆栈跟踪：

```js
Error: foobar
   at bar (Unknown script code:2:5)
   at foo (Unknown script code:6:5)
   at Anonymous function (Unknown script code:11:5)
   at Anonymous function (Unknown script code:10:2)
   at Anonymous function (Unknown script code:1:73)
```

不仅每个帧的格式不同，帧也具有较少的细节。例如，Chrome会识别出已使用新关键字，并且对eval调用有更深入的了解。这只是IE 11与Chrome的比较 - 其他类似的浏览器具有不同的格式和细节。

幸运的是，有一些工具可以规范化堆栈属性，使其在浏览器中保持一致。例如，raven-js使用TraceKit来规范化错误字符串。还有stacktrace.js和其他一些项目。

### 浏览器兼容性

window.onerror已经在浏览器中出现了一段时间 - 你会在浏览器中找到它与IE6和Firefox 2一样古老的版本。

问题是每个浏览器都以不同的方式实现window.onerror。特别是，将多少个参数发送给onerror侦听器，以及这些参数的结构。

这是一个在大多数浏览器中将参数传递给onerror的表：

|Browser|Message|URL|lineNo|colNo|errorObj|
|:-----:|:-----:|:-:|:----:|:---:|:------:|
|Firefox|✓|✓|✓|✓|✓|
|Chrome|✓|✓|✓|✓|✓|
|Edge|✓|✓|✓|✓|✓|
|IE 11|✓|✓|✓|✓|✓|
|IE 10|✓|✓|✓|✓|
|IE 9, 8|✓|✓|✓|
|Safari 10 and up|✓|✓|✓|✓|✓|
|Safari 9|✓|✓|✓|✓|
|Android Browser 4.4|✓|✓|✓|✓|

Internet Explorer 8,9和10对onerror的支持有限，这可能不足为奇。但是你可能会惊讶于Safari只在Safari 10中添加了对错误对象的支持（2016年发布）。此外，仍旧使用现有Android浏览器（现已替换为Chrome Mobile）的旧手机版仍然在那里，并且不会传递错误对象。

没有错误对象，就没有堆栈跟踪属性。这意味着这些浏览器无法从错误捕获的错误中检索有价值的堆栈信息。

### 使用try / catch 兼容 window.onerror

但是有一种解决方法 - 您可以将应用程序中的代码包装在try / catch中并自己捕获错误。这个错误对象将在每个现代浏览器中包含我们令人垂涎的堆栈属性。

考虑以下帮助器方法invoke，它使用参数数组调用对象上的函数：

```js
function invoke(obj, method, args) {
    return obj[method].apply(this, args);
}

invoke(Math, 'max', [1, 2]); // returns 2
```

这里再次调用，这次包装在try / catch中，以捕获任何抛出的错误：

```js
function invoke(obj, method, args) {
  try {
    return obj[method].apply(this, args);
  } catch (e) {
    captureError(e); // report the error
    throw e; // re-throw the error
  }
}

invoke(Math, 'highest', [1, 2]); // throws error, no method Math.highest
```

当然，在任何地方手动执行此操作非常麻烦。您可以通过创建通用包装器实用程序函数来使其更容易：

```js
function wrapErrors(fn) {
  // don't wrap function more than once
  if (!fn.__wrapped__) {
    fn.__wrapped__ = function () {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        captureError(e); // report the error
        throw e; // re-throw the error
      }
    };
  }

  return fn.__wrapped__;
}

var invoke = wrapErrors(function(obj, method, args) {
  return obj[method].apply(this, args);
});

invoke(Math, 'highest', [1, 2]); // no method Math.highest
```

因为JavaScript是单线程的，所以你不需要在任何地方使用wrap  - 只是在每个新堆栈的开头。

这意味着你需要包装函数声明：

* 在您的应用程序开始时（例如，如果您使用jQuery，请在$（document）.ready中）
* 在事件处理程序中，例如addEventListener或$ .fn.click
* 基于计时器的回调，例如setTimeout或requestAnimationFrame

示例：

```js
$(wrapErrors(function () { // application start
  doSynchronousStuff1(); // doesn't need to be wrapped

  setTimeout(wrapErrors(function () {
    doSynchronousStuff2(); // doesn't need to be wrapped
  });

  $('.foo').click(wrapErrors(function () {
    doSynchronousStuff3(); // doesn't need to be wrapped
  });
}));
```

如果这看起来像是很多工作，请不要担心！大多数错误报告库都具有增强内置函数（如addEventListener和setTimeout）的机制，因此您不必每次都调用包装实用程序。是的，raven-js也这样做。

### 将错误传输到您的服务器

好的，所以你已经完成了你的工作 - 你已经插入window.onerror，并且你还在try / catch中包装函数，以便捕获尽可能多的错误信息。

最后一步是：将错误信息传输到您的服务器。为了实现这一点，您需要设置某种报告Web服务，该服务将通过HTTP接受您的错误数据，将其记录到文件和/或将其存储在数据库中。

如果此Web服务与Web应用程序位于同一个域中，则可以使用XMLHttpRequest轻松实现。在下面的示例中，我们使用jQuery的AJAX函数将数据传输到我们的服务器：

```js
function captureError(ex) {
  var errorData = {
    name: ex.name, // e.g. ReferenceError
    message: ex.line, // e.g. x is undefined
    url: document.location.href,
    stack: ex.stack // stacktrace string; remember, different per-browser!
  };

  $.post('/logger/js/', {
    data: errorData
  });
}
```

请注意，如果必须跨源传输错误，则报告端点需要支持CORS（跨源资源共享）。

## 总结

如果您已经做到这一点，那么您现在可以拥有所需的所有工具来推送自己的基本错误报告库并将其与您的应用程序集成：

* window.onerror的工作原理以及它支持的浏览器
* 如何使用try / catch来捕获缺少window.onerror的堆栈跟踪
* 将错误数据传输到您的服务器
