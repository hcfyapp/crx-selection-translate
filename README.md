# 划词翻译

[![Build Status](https://img.shields.io/travis/lmk123/crx-selection-translate/master.svg?style=flat-square)](https://travis-ci.org/lmk123/crx-selection-translate)
[![Coverage Status](https://img.shields.io/coveralls/lmk123/crx-selection-translate/master.svg?style=flat-square)](https://coveralls.io/github/lmk123/crx-selection-translate?branch=master)
[![dependencies Status](https://img.shields.io/david/lmk123/crx-selection-translate.svg?style=flat-square)](https://david-dm.org/lmk123/crx-selection-translate)
[![devDependencies Status](https://img.shields.io/david/dev/lmk123/crx-selection-translate.svg?style=flat-square)](https://david-dm.org/lmk123/crx-selection-translate#info=devDependencies)

简单、方便、快速的 Chrome 翻译扩展。

## 注意！

**目前托管在 Chrome 网上商店的版本见 [5.x-master 分支](https://github.com/lmk123/crx-selection-translate/tree/5.x-master)。**

主分支为正在开发的 v6.0 版，这一版的划词翻译将多种开发 Chrome 扩展的常用功能分离了出来并基于它们完全重写：

 + [connect.io](https://github.com/lmk123/connect.io) - Chrome 扩展/应用里的实时、双向、基于事件且 Promise 友好的通信库，启发自 Socket.io。
 + [selection-widget](https://github.com/lmk123/selection-widget) - 划词翻译的翻译窗口。
 + [translation.js](https://github.com/lmk123/translation.js) - 划词翻译的核心翻译功能，被设计用于 Node.js，但同时也能用于浏览器端。
 + [chrome-storage-wrapper](https://github.com/lmk123/chrome-storage-wrapper) - 对 `chrome.storage` 的简单封装，基于 Promise。
 + [chrome-promise](https://github.com/lmk123/chrome-promise) - 将 chrome.* API 的回调方式变成基于 Promise 的调用方式。
 + [chrome-env](https://github.com/lmk123/chrome-env) - 给单元测试环境添加 `window.chrome`。

如果你喜欢这个项目，请给个 Star 并介绍给你的朋友 :)

## 许可

[GNU General Public License Version 3](https://www.gnu.org/licenses/gpl.html)
