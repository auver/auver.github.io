---
slug: rxjs-ipc
title: 基于RxJs封装友好的跨进程（页面）通信
authors: auver
date: 2022-06-23T10:00
tags: []
---

本文将以热门的跨平台桌面应用构建方案 Electron 为例，讲讲在跨进程通信中出现的痛点，并使用RxJs解决这些问题，当然这里的方案不仅仅适用于Electron，同样可以复制到如跨页面通信，主页面与 worker 之间的场景。

# 现状

Electron 主进程和渲染进程间，官方提供了[基础的通信能力](https://www.electronjs.org/docs/latest/tutorial/ipc)。例如，在主进程中向渲染进程发布消息的方式为：

```js
webContents.send('ping', 'whoooooooh!')
```

渲染进程响应方式为：

```js
.ipcRenderer.on('ping', (event, message) => {
    console.log(message) // Prints 'whoooooooh!'
})
```

支持在响应函数中同步（`event.returnValue`）或者异步（`event.reply`）的回复消息。对于`event.reply`来说，其本质是发送一条新的不同类型的消息，该消息指定了接收方。

在实际使用场景里，往往是甲方产生消费需求，发送消息告知乙方其需要消费数据，由乙方生产数据后回复消息供消费者消费。为了方便描述，我们把首先发送消息的甲方称为消费者，回复消息的乙方称为生产者。

<!-- truncate -->

对于生产者消费者1对1且只消费一次来说，这种消息模式是没有什么问题的。但放到实际的开发场景中，会发现有一些非1对1单次消费的场景，并由此产生问题：

* 在某个渲染进程中，有多个场景，因此有多个消费者，均通过向主进程（一个生产者）发送相同类型的消息请求消费，等待生产者回复消息，消息类型为 `reply`，这多个消费者需要分别对 `reply` 注册事件响应程序。当生产者回复消息时，这些消费者默认是无法分辨出这个 reply` 事件到底是不是回复给自己的。即生产者生产多个数据以后，无法分辨该数据需要给哪个消费者消费。

    又因为 Electron 的消息是通过结构化克隆发送的，通过传入回调函数来作为回复也是不可行的。
    
* 生产者未做好准备时，消费者便已发出消息，消息未能成功到达生产者，消息丢失，无法消费数据。
    
* 需要消费多次，即生产者需要异步地回复多条消息。

    对于仅做一次的回复消息，Promise 就可以满足。但是如果需要做多次的消息回复，Observable 是更简单有效的办法。

# Observable 的优点

* 如上所述，Observable 可以满足消费多次的场景

* 消除了同步和异步事件在响应时的差异。

* Observable 默认是冷执行的。即无消费者的情况下，生产者不会进行生产。当所有消费者消费完毕，生产者也可以马上停下。

# 设计

可以说，因为 Observable 的设计，这个模块其实是做了这样的事情：

在进程 A 创建生产者。在进程 B 创建消费者。当消费者执行订阅时，通过通信能力，实际向进程 A 的生产者发起了订阅。

而发起订阅和订阅数据的接受过程中的通信机制被模块隐藏了起来。使用者可以当做普通的 Observable 去订阅。

![image](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/10646909591/b939/b24e/1941/800c5f41f22d5ee18a8082ec8efc5801.png)

## 生产者
```js
// 由该函数创建一个 Observable 供订阅。如果你返回的是 Promise 或者其他值，会被包装成 Observable
// 函数第0个参数是 IpcEvent，后面才是消费者传入的参数
function createObservable(event, ...args) {
    return Observable.from(args);
}

rxIpc.createProvider('eventName', createObservable);
```

## 消费者
```js
// 可以传入多个参数
rxIpc.createConsumer('eventName', ...args).subscribe(() => {
    //
});
```

生产者与消费者的创建顺序没有要求。一旦双方均完成创建，生产者可以根据消费者需求开始生产数据。因为在生产者创建的过程中，会发送消息通知消费者，此时如果消费者已经创建，将会先收到生产者的通知。反之，消费者创建时，检测到生产者已经创建，将马上开始消费请求。

当消费者取消订阅，生产者也会停止生产。考虑到像 Electron 中，可能出现页面关闭，渲染进程关闭，消费者未来得及取消订阅的情况，额外监听了 "destroyed" 事件，在 destroyed 后马上停止生产。

# 进阶

## 开发新场景

不仅仅局限于Electron，这种通信方式可以复制到如跨页面通信，主页面与 worker 之间的场景。可以根据需要，适配不同的通信方式，如 LocalStorage。

## 面向对象

可以借助已有的 Class 创建生产者和消费者。

对于创建消费者 Class 的方法，返回一个新的 Class，其实是将各个方法进行了代理，发送消息到创建者，然后收到响应。

在使用时，需要注意的是：

* 构造函数不支持异步。但显然在跨进程通信机制下，对象的创建是异步的。

* 不用担心，消费者对象中任意方法的调用，会等待对象创建完成后继续。同 createConsumer 类似，这些方法会返回 Observable，只需对其订阅即可。

* 创建对象因其特殊性，没法返回 Observable 进行订阅。但可以在创建消费者对象时传入 ComsumeEvent 获得在生产者一侧实际创建成功或者失败的回调。
