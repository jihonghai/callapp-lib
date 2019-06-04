/**
 * @author suanmei <mr_suanmei@163.com>
 */
import { getIOSVersion, getBrowser } from './sources/browser';
import {
  evokeByLocation,
  evokeByIFrame,
  evokeByTagA,
  checkOpen,
} from './sources/evoke';

class CallApp {
  /**
   *Creates an instance of CallApp.
   * @param {object=} options - 配置项
   * @memberof CallApp
   */
  constructor(options) {
    const defaultOptions = {
      timeout: 2000,
      callback: () => {},
    };
    this.options = Object.assign(defaultOptions, options);
  }

  checkOpen(callback) {
    return checkOpen(() => {
      const scheme = this.getScheme();
      if (/^(http|https)/i.test(scheme)) {
        evokeByLocation(scheme);
      } else {
        // TODO
        evokeByLocation(scheme);
      }
      callback();
    }, this.options.timeout);
  }

  /**
   * 根据操作系统获取对应的scheme
   */
  getScheme() {
    const { options } = this;
    const browser = getBrowser();
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
   * 唤起客户端
   * 根据不同 browser 执行不同唤端策略
   * @param {object} config - 唤端参数项
   * @memberof CallApp
   */
  call(config) {
    const browser = getBrowser();

    const {
      appstore,
      logFunc,
      callback,
    } = this.options;

    const schemeURL = this.generateScheme(config);

    if (typeof logFunc !== 'undefined') {
      logFunc();
    }

    if (browser.isIos) {
      // 近期ios版本qq禁止了scheme和universalLink唤起app，安卓不受影响 - 18年12月23日
      // ios qq浏览器禁止了scheme和universalLink - 2019年5月1日
      if (browser.isWechat || browser.isQQ || browser.isQQBrowser) {
        evokeByLocation(appstore);
      } else if ((getIOSVersion() < 9)) {
        evokeByIFrame(schemeURL);
      } else {
        // evokeByLocation(this.generateUniversalLink(config));
      }
    // Android
    } else if (browser.isWechat) {
      evokeByLocation(this.generateYingYongBao(config));
    } else if (browser.isOriginalChrome) {
      if (typeof intent !== 'undefined') {
        // evokeByLocation(this.generateIntent(config));
      } else {
        // scheme 在 andriod chrome 25+ 版本上必须手势触发
        evokeByTagA(schemeURL);
      }
    } else {
      evokeByIFrame(schemeURL);
    }

    this.checkOpen(callback);
  }
}

export default CallApp;
