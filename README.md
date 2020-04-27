# 划词翻译

一款能用于 Chrome、Firefox 和 Microsoft Egde 浏览器的划词翻译扩展程序，我们的目标是让浏览任意语言的网站都能变得无比轻松。

划词翻译的介绍与安装方式请移步官方网站 [https://hcfy.limingkai.cn](https://hcfy.limingkai.cn)。

## 参与开发

划词翻译欢迎并鼓励开发者参与开发！请按照以下步骤搭建开发环境：

 1. Fork 项目之后将代码克隆到本地。
 2. 将 Node.js 版本切换到 8.x（推荐使用 [nvm](https://github.com/nvm-sh/nvm)），然后运行 `npm ci` 安装项目依赖
 3. 运行 `npm run dev`，项目的 [src 文件夹](https://github.com/Selection-Translator/crx-selection-translate/tree/master/src)下会生成一个名为 `bundle` 的文件夹
 4. 在 Chrome 浏览器的扩展程序页面（chrome://extensions/）勾选开发者模式，点击“加载已解压的扩展程序”，将路径指向代码库的 [src 文件夹](https://github.com/Selection-Translator/crx-selection-translate/tree/master/src)。

之后，你就可以更改代码并在浏览器中查看效果了。

### 划词翻译的子项目

为了方便维护，划词翻译将一些功能分离了出来，如果你是想对以下功能进行调整，请前往对应的代码仓库：
 + [connect.io](https://github.com/Selection-Translator/connect.io) - Chrome 扩展/应用里的实时、双向、基于事件且 Promise 友好的通信库，启发自 Socket.io。
 + [chrome-call](https://github.com/Selection-Translator/chrome-call) - 将 Chrome API 的使用回调函数接收结果的调用形式改为返回 Promise 对象的调用形式。
 + [chrome-env](https://github.com/Selection-Translator/chrome-env) - 给非扩展程序运行环境添加 `window.chrome`，被设计用于单元测试。

## 第三方开源库

划词翻译的诞生离不开这些优秀的开源程序：

 - [Vue.js](http://vuejs.org/)
 - [PDF.js](https://mozilla.github.io/pdf.js/)
 - [Bootstrap](http://getbootstrap.com/)
 - [Webpack](http://webpack.github.io/)
 - [Babel](http://babeljs.io/)
 - [Sass](http://sass-lang.com/)
 - [Gulp](http://gulpjs.com/)
 - [Jasmine](http://jasmine.github.io/)
 - [Karam](https://karma-runner.github.io/)

[package.json](https://github.com/Selection-Translator/crx-selection-translate/blob/master/package.json) 的 `dependencies` 与 `devDependencies` 里列出了划词翻译使用到的所有第三方程序。

## 许可

[GNU General Public License Version 3](https://www.gnu.org/licenses/gpl.html)
