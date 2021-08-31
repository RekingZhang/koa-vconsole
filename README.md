# koa-vconsole

开发环境 HTML 请求自动 `vconsole` koa 中间件
[![npm version](https://img.shields.io/npm/v/koa-vconsole.svg?style=flat-square)](https://www.npmjs.org/package/koa-vconsole)
[![Build Status](https://travis-ci.org/RekingZhang/koa-vconsole.svg?branch=master)](https://travis-ci.org/RekingZhang/koa-vconsole)
[![Coverage Status](https://coveralls.io/repos/github/RekingZhang/koa-vconsole/badge.svg?branch=master)](https://coveralls.io/github/RekingZhang/koa-vconsole?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/koa-vconsole.svg?style=flat-square)](http://npm-stat.com/charts.html?package=koa-vconsole)

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
