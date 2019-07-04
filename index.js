/**
 * @author suanmei <mr_suanmei@163.com>
 */
import { getBrowser } from './sources/browser';
import {
  evokeByLocation,
  evokeByIFrame,
  evokeByTagA,
  checkOpen,
} from './sources/evoke';

class CallApp {
  /**
   * Creates an instance of CallApp.
   * @param {object=} options - 配置项
   * @memberof CallApp
   */
  constructor(options) {
    const defaultOptions = {
      timeout: 5000,
      callback: () => {},
    };
    this.options = Object.assign(defaultOptions, options);
    this.browser = getBrowser();
  }

  /**
   * 检查唤端是否成功
   *
   * @param {string} schemeURL 唤端成功的地址
   * @param {function} callback 回调函数
   */
  checkOpen(schemeURL, callback) {
    const { browser, options } = this;
    return checkOpen(() => {
      callback(schemeURL);
    }, () => {
      const scheme = this.getScheme();
      let realUrl = null;

      // 调起地址为非scheme直接跳转
      if (/^(http|https)/i.test(scheme)) {
        realUrl = scheme;
      } else if (browser.isIos) {
        // 跳转到下载地址
        // 近期ios版本qq禁止了scheme和universalLink唤起app，安卓不受影响 - 18年12月23日
        // ios qq浏览器禁止了scheme和universalLink - 2019年5月1日
        // if (browser.isWechat || browser.isQQ || browser.isQQBrowser) {
        if (browser.isWechat || browser.isQQ) {
          realUrl = options.tencentUrl;
        } else {
          realUrl = options.iOSUrl;
        }
      } else if (browser.isWechat || browser.isQQ) {
        // Android
        realUrl = options.tencentUrl;
      } else {
        realUrl = options.androidUrl;
      }

      callback(realUrl);

      if (realUrl) {
        evokeByLocation(realUrl);
      }
    }, this.options.timeout);
  }

  /**
   * 根据操作系统获取对应的scheme
   */
  getScheme() {
    const { options, browser } = this;
    let scheme = null;
    if (browser.isAndroid) {
      scheme = options.android;
    }

    if (browser.isIos) {
      scheme = options.iOS;
    }

    return scheme;
  }

  /**
   * 唤醒APP
   */
  isCallingApp() {
    const {
      iOS,
      android,
      iOSUrl,
      androidUrl,
      tencentUrl,
    } = this.options;

    return !!(iOS && android && iOSUrl && androidUrl && tencentUrl);
  }

  /**
   * 唤起客户端
   * 根据不同 browser 执行不同唤端策略
   * @memberof CallApp
   */
  call() {
    const { browser } = this;
    const {
      tencentUrl,
      logFunc,
      callback,
      link,
    } = this.options;

    if (typeof logFunc !== 'undefined') {
      logFunc();
    }

    // 存在超链接，直接进行跳转
    if (link) {
      evokeByLocation(link);
    } else if (this.isCallingApp()) {
      const schemeURL = this.getScheme();
      if (browser.isIos) {
        // 近期ios版本qq禁止了scheme和universalLink唤起app，安卓不受影响 - 18年12月23日
        // ios qq浏览器禁止了scheme和universalLink - 2019年5月1日
        // if (browser.isWechat || browser.isQQ || browser.isQQBrowser) {
        if (browser.isWechat || browser.isQQ) {
          evokeByLocation(schemeURL);
        } else {
          evokeByTagA(schemeURL);
        }
      // Android
      } else if (browser.isWechat) {
        evokeByLocation(tencentUrl);
      } else if (browser.isOriginalChrome) {
        // scheme 在 andriod chrome 25+ 版本上必须手势触发
        evokeByTagA(schemeURL);
      } else {
        evokeByIFrame(schemeURL);
      }

      this.checkOpen(schemeURL, callback);
    }
    return this;
  }
}

export default CallApp;
