Performance接口可以获取到当前页面中与性能相关的信息。它是High Resolution Time API的一部分，也融合了Performance Timeline API、Navigation Timing API、User Timing API和Resource Timing API

该类型的对象可以通过调用只读属性 window.performance 来获得

> 注意：除了以下指出的情况外，该接口及其成员在 Web Worker 中可用。此外，还需注意，performance 的创建和衡量都是同一环境下的。即，如果你在主线程（或者其他 worker）中创建了一个 performance，那么它在另外的 worker 线程中是不可用的；反之亦然

## 属性

performance接口没有继承任何属性

performance.navigation 对象提供了在指定的时间段里发生操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等

performance.timing - PerformanceTiming 对象包含延迟相关的性能信息。

performance.timeOrigin - 返回性能测量开始时的时间的高精度时间戳。

## 事件处理程序

performance.onresourcetimgingbufferfull

一个回调的EvnetTarget，当触发resourcetimingbufferfull事件时会被调用

## 方法

Performance接口没有继承任何方法


* Performance.clearMarks() 将给定的 mark 从浏览器的性能输入缓冲区中移除。

* Performance.clearMeasures() 将给定的 measure 从浏览器的性能输入缓冲区中。

* Performance.clearResourceTimings() 从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的  performance entries。

* Performance.getEntries() 基于给定的 filter 返回一个 PerformanceEntry 对象的列表。

* Performance.getEntriesByName() 基于给定的 name 和 entry type 返回一个 PerformanceEntry 对象的列表。

* Performance.getEntriesByType() 基于给定的 entry type 返回一个 PerformanceEntry 对象的列表

* Performance.mark() 根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp

* Performance.measure() 在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp

* Performance.now() 返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp

* Performance.setResourceTimingBufferSize() 将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量

* Performance.toJSON() Not available to workers 其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象
