---
slug: hot-vs-cold-observables
title: Observable的冷与热
authors: auver
date: 2019-11-01T10:00
tags: [rxjs, javascript]
---

本文翻译自[Hot vs Cold Observables](https://benlesh.medium.com/hot-vs-cold-observables-f8094ed53339)


COLD 是指你的生产者在 observable 内部创建。

```javascript
// COLD
var cold = new Observable((observer) => {
  var producer = new Producer();
  // have observer listen to producer here
});
```

HOT 是指当你的生产者在 observable 外部创建。

```javascript
// HOT
var producer = new Producer();
var hot = new Observable((observer) => {
  // have observer listen to producer here
});
```

<!-- truncate -->

## 深入了解正在发生的事情...

我的上一篇关于[通过构建 Observable 学习 Observable](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)的文章主要是为了说明 `observables` 只是函数。那篇文章的目标是揭开 `observables` 本身的神秘面纱，但它并没有深入探讨也许是最容易引起困惑的概念——`observables` 的“热”和“冷”。

## Observables 只是函数！

Observables 只是将观察者与生产者绑定的函数。它们不一定设置生产者，而是设置一个观察者来监听生产者，并通常返回一个方法以移除监听。`subscription ` 的行为就像调用一个函数，将观察者传递给它。

## 什么是生产者 Producer？

生产者 Producer 是您的 observable 的值来源。它可以是 WebSockets、DOM 事件、迭代器或循环遍历数组等任何用于获取值并将其传递给 `observer.next(value)` 的东西。

## 冷 Observables：生产者在内部创建

如果 observable 的底层的生产者是在订阅期间被创建并激活，则该 observable 是“cold”的。这意味着，如果 observables 是函数，那么通过调用该函数来创建和激活生产者。

1. 创建生产者
2. 激活生产者
3. 开始监听生产者
4. 单播

下面的示例是“cold”的，因为它在订阅到 Observable 时，在订阅函数中创建并监听 WebSocket：

```javascript
const source = new Observable((observer) => {
  const socket = new WebSocket('ws://someurl');
  socket.addEventListener('message', (e) => observer.next(e));
  return () => socket.close();
});
```

因此，订阅 `source` 的任何内容都将获得自己的 WebSocket 实例，并且在取消订阅时会关闭该 socket。这意味着我们的 source 实际上只能单播，因为生产者只能发送给一个 observer。

## 热 Observables：生产者在外部创建

如果 observable 的底层生产者在订阅之外被创建或激活，则该 observable 是热的[^1]。

1. 共享对生产者的引用
2. 开始监听生产者
3. 多播（通常[^2]）

如果我们将上面的示例中 WebSocket 的创建移至 observable 之外，它将变成热的：

```javascript
const socket = new WebSocket('ws://someurl');
const source = new Observable((observer) => {
  socket.addEventListener('message', (e) => observer.next(e));
});
```

现在订阅 `source` 的任何内容都将共享相同的 WebSocket 实例。现在它实际上会多播给所有订阅者。但我们有一个小问题：我们不再跟踪对 `source` 的订阅，所以我们如何在需要时关闭它？我们可以添加一些引用计数来解决这个问题：

```javascript
const socket = new WebSocket('ws://someurl');
const source = new Observable((observer) => {
  socket.addEventListener('message', (e) => observer.next(e));
});

let refs = 0;
return new Observable((observer) => {
  refs++;
  let sub = source.subscribe(observer);
  return () => {
    refs--;
    if (refs === 0) mainSub.unsubscribe();
    sub.unsubscribe();
  };
});
```

现在我们有了一个热 observable，当所有对它的订阅结束时，我们使用引用计数来判断是否取消订阅底层源 observable。[这里有一个 JSBin 展示了这个基本概念](http://jsbin.com/godawic/edit?js%2Coutput=)。

### Rx Subjects

在我们将冷可观测对象转换为热可观测对象之前，首先需要介绍一种新类型：Rx Subject。它具有以下几个特点：

1. 它是一个可观测对象。它形式上像一个可观测对象，并且具有相同的操作符。
2. 它是一个观察者。它以观察者身份进行鸭子类型检查。当作为可观察对象进行订阅时，会发出任何通过 `next` 输入到其中的值。
3. 它支持多播（multicast）。通过 `subscribe()` 添加到其中的所有观察者都会被添加到内部观察者列表中。
4. Subject 在取消订阅、完成或出错后不能再重复使用。
5. 它会将值传递给自己。再次强调第二点，在 Subject 中 `next` 输入值后会从其自身的可观察端口输出值。

Rx Subject 被称为 “subject”，因为上面提到的第三点。在 Gang Of Four [^译注1] 观察者模式中，“Subject” 可以视为具有 `addObserver` 方法的类，只不过使用的是 `subscribe` 方法作为我们的 `addObserver` 方法。[这里有一个展示 Rx Subject 基本行为的 JSBin。](http://jsbin.com/muziva/1/edit?js%2Coutput=)

### 将冷可观测对象转换为热可观测对象

有了上面介绍过的 Rx Subject，我们可以使用一些函数式编程方法将任何“冷”可观测对象转换为“热”可观测对象：

```javascript
function makeHot(cold) {
  const subject = new Subject();
  cold.subscribe(subject);
  return new Observable((observer) => subject.subscribe(observer));
}
```

我们的 `makeHot` 方法将接受任何冷可观测对象，并通过创建与结果可观测对象共享的主题来使其变成热可观测对象。[这里展示了此方法运行结果。](http://jsbin.com/ketodu/1/edit?js%2Coutput=)

然而，还存在一个小问题：我们没有跟踪对源（source）进行订阅，那么我们如何在需要时取消对其进行取消订阅？我们可以添加一些引用计数来解决这个问题：

```javascript
function makeHotRefCounted(cold) {
  const subject = new Subject();
  const mainSub = cold.subscribe(subject);
  let refs = 0;
  
  return new Observable((observer) => {
    refs++;
    let sub = subject.subscribe(observer);
    return () => {
      refs--;
      if (refs === 0)
        mainSub.unsubscribe();
      sub.unsubscribe();
    };
  });
}
```

现在我们有了一个既热又使用引用计数来跟踪源（source）取消订阅情况的可观测对象。[这里展示了此方法运行结果。](http://jsbin.com/lubata/1/edit?js%2Coutput=)

### 在 RxJS 中使用 `publish()` 或 `share()`

您可能不应该使用上面提到过的任何 `makeHot` 函数，而应该使用像 `publish()` 和 `share()` 这样的操作符。在 Rx 中有很多方法可以使冷可观测对象变成热可观测对象，并且每种方法都能高效且简洁地执行每种操作所需工作。关于此主题，在 Rx 中使用各种操作符进行详细介绍可能需要写一篇完整文章，但本文不涉及此目标。本文旨在明确 “hot” 和 “cold” 的真正含义。

在 RxJS5 中，“share()” 操作符会生成一个热且具备引用计数功能（refCounted）以便在失败时重试或成功后重复执行操作序列（observable）。由于 subjects 在错误、完成或取消订阅后无法再次使用，“share()” 操作符会重新利用已结束（dead）subjects 来允许重新对生成的observable 进行重复订阅。

### “温暖”的 Observable

鉴于以上所有内容，也许您可以看出一个 observable 其实既可以是“hot”，也可以是“cold”。也就是说它同时侦听两个 producers？一个由其自身创建和另一个闭包？那可能不太好...但也有极少数情况下可能会需要这样做。例如多路复用 web socket 必须共享 socket，并发送自己专属 subscription 并过滤数据流。

### “Hot” 和 “Cold” 都与 Producer 相关

如果您闭包了共享引用以侦听 producer，则该 observable 是“hot”的；如果您在 observable 内部创建新 producer，则该 observable 是“cold”的；如果两者都做...那您到底做什么呢？我想那就是“温暖”的吧。

[^1]:（注意：说 producer 在 subscription 内部被 “activated”，但直到稍后某个时间点才被 “created”，似乎有点奇怪；但借助代理（proxies），可能还真能实现）。通常情况下，“hot” observables 的 producers 同时被创建和激活外部 subscription。

[^2]: 热 observables 通常支持多播（multicast），但它们可能正在监听只支持一次监听器的 producer 上发生事件流动情况下；此时称之为 “multicast” 的依据略微模糊。

[^译注1]: \<Design Patterns\> 这本书的作者被称为 Gang of Four “四人帮”