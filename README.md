## callapp-lib

callapp-lib 是一个 H5 唤起 APP 的解决方案，能够满足大部分唤起客户端的场景，也预留了扩展口，帮你实现一些定制化的功能。

如果你想了解一些唤端的原理知识，或者阅读下面的文档有不理解的名词，可以访问这篇博客 [H5唤起APP指南](https://suanmei.github.io/2018/08/23/h5_call_app/) 。

如果你在使用 callapp-lib 的过程中，有好的想法或者发现了bug，提 Issue 就行，作者会及时跟进。

## Install

Install with [npm](https://www.npmjs.com/):

``` sh
$ npm install --save callapp-lib
```

## Usage

``` js
const CallApp = require('callapp-lib');

or

import CallApp from 'callapp-lib';
```

callapp-lib 同样支持 `script` 加载，你可以使用下面的 **cdn文件（地址在下面的示例中）**，也可以下载 `dist/index.umd.js` 到你的项目中，`index.umd.js` 会暴露一个全局变量 `CallApp` ，这个全局变量和上面 `commonjs` 导入的 `CallApp` 内容是一致的，使用方法也是一致的。

``` html
<!-- 及时下载未压缩的最新版本 Js -->
<script src="https://unpkg.com/callapp-lib"></script>

or

<!-- 具体某一版本，本例中是 2.1.5 ，下载速度较上面快一些，因为上面的地址会有 302 -->
<script src="https://unpkg.com/callapp-lib@2.1.5/dist/index.umd.js"></script>

or

<!-- 这是压缩版本，文件体积会小 1/2 左右，下载速度最快，生产环境建议使用这个 -->
<script src="https://unpkg.com/callapp-lib@2.1.5/dist/index.umd.min.js"></script>
```

callapp-lib 中传递出来的是一个类，你需要将它实例化，然后才能去调用实例对象的方法。

``` js
const options = {
  key1: 'xxx',
  key2: 'xxx'
};
const callLib = new CallApp(options);

callLib.open({
  param: {},
  path: 'xxx'
});
```

## Demo

请访问[demo页面](https://raw.githack.com/suanmei/callapp-lib/master/example/index.html)，或访问[demo文件](https://github.com/suanmei/callapp-lib/blob/master/example/index.html)

如果你在使用移动端，可以扫描下方二维码:

![示例页面二维码](https://raw.githubusercontent.com/suanmei/callapp-lib/master/screenshots/demo-qrcode.png)

## Options

实例化过程中，需要传递一个 options 对象给类，options 对象各属性需要严格按照下面的格式。

下面所有不是必填的，如果你不需要传值，就不要写这个属性，而不是传递一个空字符串或者空对象，callapp-lib 并未对这种情况进行严格的检测。

### appstore

类型: `string`  
必填: ✅

APP 的 App Store 地址，例： `https://itunes.apple.com/cn/app/id1383186862`。

### yingyongbao

类型: `string`  
必填: ✅

APP 的应用宝地址，例：`'//a.app.qq.com/o/simple.jsp?pkgname=com.youku.shortvideo'`。

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

## Method

### call

唤端功能。接收一个对象作为参数，该对象支持以下属性：  

+ path

  类型: `string` 
  必填: ✅  

  需要打开的页面对应的值，URL Scheme 中的 path 部分，参照 [H5唤起APP指南](https://suanmei.github.io/2018/08/23/h5_call_app/) 一文中的解释。
  
  只想要直接打开 app ，不需要打开特定页面，path 传空字符串 `''` 就可以。

+ param

  类型: `object`  
  必填: ❎   

  打开 APP 某个页面，它需要接收的参数。
