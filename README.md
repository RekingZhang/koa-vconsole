# koa-vconsole

开发环境 HTML 请求自动 `vconsole` koa 中间件

## Installing

```bash
$ npm install koa-vconsole -D
```

## Example

```javascript
const vConsole = require('koa-vconsole');

app.use(vConsole());
```

## Config

```js
{
  //URL匹配规则，默认匹配所有请求
  test: /[\s\S]*/, //defalut
  //排除请求路径
  exclude: [], //defalut
  //自定义 vconsole 路径
  vConsoleUrl: 'https://unpkg.com/vconsole/dist/vconsole.min.js' //defalut
}
```
