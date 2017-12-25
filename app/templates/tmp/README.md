#《使用 superagent 与 cheerio 完成简单爬虫》

使用 superagent 抓取网页
使用 cheerio 分析网页

##内容

Node.js 总是吹牛逼说自己异步特性多么多么厉害，但是对于初学者来说，要找一个能好好利用异步的场景不容易。我想来想去，爬虫的场景就比较适合，没事就异步并发地爬几个网站玩玩。

本来想教大家怎么爬 github 的 api 的，但是 github 有 rate limit 的限制，所以只好牺牲一下 CNode 社区（国内最专业的 Node.js 开源技术社区），教大家怎么去爬它了。

我们这回需要用到三个依赖，分别是 express，superagent 和 cheerio。

先介绍一下，

* superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。

* cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

##运行

安装依赖 npm install

写应用逻辑

我们应用的核心逻辑长这样


```
app.get('/', (req, res, next) => {
  superagent.get('https://cnodejs.org/')
    .end( (err, sres) =>{
    // 常规的错误处理
    if (err) {
      return next(err);
    }
    // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
    // 剩下就都是 jquery 的内容了
    const $ = cheerio.load(sres.text);
    const items = [];
    $('#topic_list .topic_title').each((idx, element) => {
      const $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      });
    });

    res.send(items);
  });
});
```

执行npm run build会拷贝src下所有文件到build目录，并将目录下js文件转码成es5语法

执行 npm run release 会执行build命令，然后检查git分支、版本、是否有更新，最后发布到 npm