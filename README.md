#右键翻译


右键翻译是一款用于Google Chrome浏览器的扩展程序。
你可以[在Chrome网上应用店安装](https://chrome.google.com/webstore/detail/ikhdkkncnoglghljlkmcimlnlhkeamad)。

开发的初衷是因为Chrome的网页翻译总是出错，而且想更便捷的进行单词翻译，
所以研究了百度和有道翻译服务的接口，整合成了这样的一个扩展。

右键翻译至今已经过四个版本（从1.0到4.0），每一次的变更，我都重写了整个扩展。
我将书上看到的各种知识融入其中，同时这也让我对js有了更深的认识，于是我开放了源代码，
希望能给想学习扩展开发或者js的人有所帮助 ;)

2014.4.21 v4.1.2

为了避开Chrome的[&lt;all_urls>bug](https://code.google.com/p/chromium/issues/detail?id=353489)，将扩展权限里面的&lt;all_urls>改为了*://*/*。
*://*/*等同于http://*/*、https://*/*和file:///*这三个权限，而&lt;all_urls>比它多了一个chrome://favicon/*的权限。
顺便说一句，这个bug正是在我的扩展里被发现然后提出的。- -
