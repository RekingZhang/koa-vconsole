import { Middleware } from 'koa';

type vConsoleOptions = {
	/*
	 * URL匹配规则，默认匹配所有请求: /[\s\S]/
	 */
	test?: string;
	/*
	 * 需要排除的请求路径，默认 : []
	 */
	exclude?: string[];
	/*
	 * 自定义vconsole地址，默认: "https://unpkg.com/vconsole/dist/vconsole.min.js"
	 */
	vConsoleUrl?: string;
};

declare function vConsole(opts?: vConsoleOptions): Middleware;
declare namespace vConsole {
	const vConsoleOptions: vConsoleOptions;
}

export = vConsole;
