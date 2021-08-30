const { JSDOM } = require('jsdom');

module.exports = function ({
	test = /[\s\S]*/,
	exclude = [],
	vConsoleUrl = 'https://unpkg.com/vconsole/dist/vconsole.min.js'
} = {}) {
	return async function vconsole(ctx, next) {
		await next();

		// 只处理返回类型是html的请求
		if (!ctx.response.is('html')) return;

		// 忽略白名单URL
		if (exclude.includes(ctx.url)) return;

		if (!test.test(ctx.url)) return;

		const dom = new JSDOM(ctx.body);

		const vConsoleScriptLink = dom.window.document.createElement('script');
		const vConsoleScriptInit = dom.window.document.createElement('script');

		vConsoleScriptLink.src = vConsoleUrl;

		vConsoleScriptInit.text = 'var vConsole = new window.VConsole();';

		dom.window.document.head.appendChild(vConsoleScriptLink);
		dom.window.document.head.appendChild(vConsoleScriptInit);

		ctx.body = dom.serialize();
	};
};
