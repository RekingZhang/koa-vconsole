const Koa = require('koa');
const request = require('supertest');
const views = require('koa-views');
const Router = require('koa-router');
const expect = require('expect.js');

const vConsole = require('./../lib/vconsole');

describe('koa-vconsole', function () {
	const app = new Koa();
	const router = new Router();
	const render = views(__dirname + '/views');

	const vConsoleUrl =
		'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.9.1/vconsole.min.js';

	router.get('/', async (ctx) => {
		await ctx.render('./index.html');
	});

	router.get('/whitelist', async (ctx) => {
		await ctx.render('./index.html');
	});

	router.get('/json', async (ctx) => {
		ctx.body = {
			name: 'tom',
			age: 19
		};
	});

	app.use(
		vConsole({
			exclude: ['/whitelist'],
			vConsoleUrl
		})
	);

	app.use(render).use(router.routes());

	it('test non-html requests', (done) => {
		request(app.listen())
			.get('/json')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.body).to.have.property('name', 'tom');

				done();
			});
	});
	it('test insert vconsole', (done) => {
		request(app.listen())
			.get('/')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.text).to.contain('vConsole');

				done();
			});
	});

	it('test white list', (done) => {
		request(app.listen())
			.get('/whitelist')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.text).not.to.contain('vConsole');

				done();
			});
	});

	it('test default config', (done) => {
		const app = new Koa();
		const router = new Router();
		const render = views(__dirname + '/views');

		router.get('/', async (ctx) => {
			await ctx.render('./index.html');
		});

		app.use(vConsole()).use(render).use(router.routes());

		request(app.listen())
			.get('/')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.text).to.contain('vConsole');

				done();
			});
	});

	it('test custom rule', (done) => {
		const app = new Koa();
		const router = new Router();
		const render = views(__dirname + '/views');

		router.get('/index', async (ctx) => {
			await ctx.render('./index.html');
		});
		router.get('/detail', async (ctx) => {
			await ctx.render('./index.html');
		});

		app.use(
			vConsole({
				test: /\/index/
			})
		)
			.use(render)
			.use(router.routes());

		request(app.listen())
			.get('/index')
			.expect('Content-Type', /html/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);

				expect(res.text).to.contain('vConsole');

				request(app.listen())
					.get('/detail')
					.expect('Content-Type', /html/)
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);

						expect(res.text).not.to.contain('vConsole');

						done();
					});
			});
	});
});
