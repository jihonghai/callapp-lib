## callapp-lib

callapp-lib 是一个 H5 唤起 APP 的解决方案，能够满足大部分唤起客户端的场景，也预留了扩展口，帮你实现一些定制化的功能。

如果你想了解一些唤端的原理知识，或者阅读下面的文档有不理解的名词，可以访问这篇博客 [H5唤起APP指南](https://suanmei.github.io/2018/08/23/h5_call_app/) 。

如果你在使用 callapp-lib 的过程中，有好的想法或者发现了bug，提 Issue 就行，作者会及时跟进。


## Usage
callapp-lib 支持 `script` 加载，你可以使用 `dist/index.umd.js` 到项目中，`index.umd.js` 会暴露一个全局变量 `CallApp` 。

``` js
const options = {
  key1: 'xxx',
  key2: 'xxx'
};
new CallApp(options).call()
```

## Options 配置项

配置项中 link 与 iOS、android、iOSUrl、androidUrl、tencentUrl 2组数据 二选一。如果2组数据都有值，link优先级最高。

### link

类型: `string`
必填: ❎

直接跳转的超链接地址，例： `https://www.zhihu.com`。

### iOS

类型: `string`
必填: ❎

APP 的 iOS scheme 地址，例： `miguvideo://miguvideo`。

### android

类型: `string`
必填: ❎

APP 的 Android scheme 地址，例： `miguvideo://miguvideo`。

### iOSUrl

类型: `string`
必填: ❎

APP 的 App Store 地址，例： `https://itunes.apple.com/cn/app/id787130974`。

### androidUrl

类型: `string`
必填: ❎

APP 的 Android应用下载 地址，例： `http://g.10086.cn/hao/0vt0l`。

### tencentUrl

类型: `string`
必填: ❎

APP 的应用宝地址，例：`https://sj.qq.com/myapp/detail.htm?apkName=cmccwm.mobilemusic`。

### timeout

类型: `number`
必填: ❎
默认值: 2000

等待唤端的时间（单位: ms），超时则判断为唤端失败。

### logFunc

类型: `function`
必填: ❎

埋点入口函数。运营同学可能会希望我们在唤端的时候做埋点，将你的埋点函数传递进来，不管唤端成功与否，它都会被执行。当然，你也可以将这个函数另作他用。

### callback

类型: `function`
必填: ❎

自定义唤端失败回调函数。传递 `callback` 不会覆盖 *callapp-lib* 库中默认的唤端失败处理逻辑。

## Method 方法

### call

唤端功能。
