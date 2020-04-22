## 我的基金理财盯盘工具

为自己开发的一个基金理财盯盘工具，使用 react ssr + nodejs。

数据是根据各大网站进行实时的更新的，能提供单天的盈利估值预测，可以查看单天的 24 小时新闻信息，懒人盯盘专用。

盯盘屏幕（好样的，今天有 8000 多盈利）：

![](https://s1.ax1x.com/2020/04/22/JUmQDx.png)

实时的仓位估值数据：

![](https://s1.ax1x.com/2020/04/22/JUmm8J.png)

24 小时的新闻消息：

![](https://s1.ax1x.com/2020/04/22/JUmt8H.png)

#### 如何启动？

```js
npm install
npm start
```
打开 `http://localhost:3000` 即可。

#### 如何更新自己的基金数据？

更新 /server/json/index.js 里的数据即可。

#### 挂在后台运行？

```js
npm install -g pm2
npm run server
```

