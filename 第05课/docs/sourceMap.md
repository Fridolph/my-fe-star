[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

sourceMap 是一个独立的map文件，与源码在同一个目录。

## 一、从源码转换说起

常见的源码转换，有以下三种情况：

1. 压缩，减小体积
2. 多文件合并，减少HTTP请求数
3. 其他语言编译成JS（TypeScript、CoffeeScript）

生产环境运行的代码不同于开发环境，debug很难。

通常的，JS解释器会告诉我们第几行第几列发生错误，但经过转换后的代码就没用了，这就是sourceMap产生所要解决的问题。

## 二、什么是sourceMap

简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

## 三、如何启用sourceMap

只要在转换后的代码尾部，加上下面这行就好

    //@ sourceMappingURL=/path/to/file.js.map

在Developer Tools的Setting设置中，确认选中"Enable source maps"。

## 四、如何生成sourceMap

[sourceMap生成参考](https://code.tutsplus.com/tutorials/source-maps-101--net-29173)

## 五、sourceMap的格式

打开sourceMap文件，大概是这样

```js
{
  version: 3,
  file: 'out.js',
  sourceRoot: '',
  sources: ['foo.js', 'bar.js'],
  names: ['src', 'maps', 'are', 'fun'],
  mappings: 'AAgBC,SAAQ,CAAEA'
}
```

整个文件就是一个JavaScript对象，可以被解释器读取。它主要有以下几个属性:

* version sourceMap版本
* file 转换后的文件名
* sourceRoot 转换前的文件所在目录。如果与转换前的文件在同一目录，该项为空
* sources 转换前的文件。该项是一个数组，表示可能存在多个文件合并
* names 转换前的所有变量名和属性名
* mappings 记录位置信息的字符串

## 六、mappings属性

两个文件的各个位置是如何一一对应，其关键就是map文件的mappings属性。这是一个长字符串，分为三层：

> 第一层是`行对应`，以分号表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推
> 第二层是`位置对应`，以逗号表示，每个逗号对应转换后源码的一个位置。所以第一个逗号前的内容，就对应该源码的第一个位置，以此类推
> 第三层是`位置转换`，以VLQ编码表示，代表该位置对应的转换前的源码位置
