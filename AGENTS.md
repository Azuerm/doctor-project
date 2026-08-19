# AGENTS.md

移动端优先的 Vue 3 + Vite 应用，使用 Vant 4（移动端 UI）+ Pinia + vue-router + axios + echarts。代码注释与提交信息均使用中文，请保持一致。

## 常用命令

- `npm run dev` — 开发服务器（内置 mock 数据，见下）
- `npm run build` / `npm run preview`
- 未配置 lint、format、test、typecheck 相关工具。
- 需要 Node `^22.18.0 || >=24.12.0`（见 package.json 的 `engines`）。

## 目录与约定

- 大部分页面是 `src/views/<name>/index.vue`，但有例外：`/` 路由组件是 `src/views/home/HomeView.vue`（不是 `home/index.vue`），`/detail/:productId/:productName` 对应 `src/views/list/detail.vue`。路由只定义在 `src/router/index.js`（`createWebHistory`），懒加载用 `() => import(...)`，参数路由使用 `props: true`。注意：HomeView 会跳转到 `/computer`，但该路由并不存在（`src/views/computer/index.vue` 存在但未注册路由）。
- 所有 HTTP 请求都经由 `src/api/index.js` -> `src/utlis/request.js` 中的 axios 实例。目录名刻意拼写为 **`utlis`**（不是 `utils`），不要“修正”它。
- `request.js` 响应拦截器返回的是整个 axios `response`，**不是** `response.data`——调用方取数据要写 `res.data.data`。请求拦截器会自动带上 `localStorage` 里的 `token` 作为 `Authorization: Bearer <token>` 请求头。`baseURL` 取 `import.meta.env.VITE_API_BASE`（仓库无 `.env` 文件，默认 `''`）。
- Pinia store 采用 setup 风格（`defineStore` + refs/computed）。`src/stores/counter.js` 的 `getAreaList(force)` 会缓存数据并去重进行中的请求。
- `@` 别名指向 `src/`（同时配置在 `vite.config.js` 和 `jsconfig.json`）。

## Mock API（仅开发环境）

`vite.config.js` 注入了一个中间件，在开发环境拦截 `METHOD /api/...` 请求。数据存放在 `mock/index.js`，以 `"METHOD /path"` 为 key。新增接口时在此添加对应 key 即可（mock 中间件优先于 `/api` 代理，未命中 mock 的请求才会转发到 `http://localhost:3000`，`rewrite` 会去掉 `/api` 前缀）。

- mock 项可以是普通对象或函数 `(body, query)`；GET 的 query 参数通过 `query` 传入。
- `request.js` 的响应拦截器会拒绝任何 `code !== 200` 的响应（弹出 `alert(msg)`）。mock 必须返回 `code: 200`；现有的若干条目返回 `code: 0`，属于未接入 `src/api` 的废弃数据。
- `/api/provinceDetail` 期望省份名以 `明文 + MD5(明文)` 形式签名后传入，见 `src/utlis/encrypt.js`。

## 注意事项

- Vant 组件通过 `unplugin-vue-components` + `VantResolver` 自动按需引入，禁止手动 import 组件。但函数式 API（`showToast`、`showLoadingToast` 等）必须依赖 `src/main.js` 中的 `import 'vant/lib/index.css'`，不要删除。
- echarts 从 `echarts/core` 按需引入，中国地图 GeoJSON 位于 `src/assets/json/china.json`（动态 import + `echarts.registerMap('china', ...)`）。保持按需引入的写法，否则完整引入 echarts 会增加约 1MB 体积。
- 基于 rem 的响应式布局：`html { font-size: 13.333vw }`，超过 750px 封顶 100px，body `max-width: 750px`（见 `src/assets/css/base.css`）。组件样式中使用 `rem` 单位。