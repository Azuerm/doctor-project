## Why

移动端应用目前页面相互独立跳转，缺少全局导航入口，用户在首页、列表、详情等页面之间来回切换不便。添加全局底部导航栏（TabBar）提供统一的四个标签页入口，提升移动端导航体验。

## What Changes

- 新增三个页面与路由：分类（`/category`）、消息（`/message`）、我的（`/profile`），均采用 `src/views/<name>/index.vue` 约定。
- 新增全局底部导航栏，包含「首页 / 分类 / 消息 / 我的」四个标签，基于 Vant 4 的 `van-tabbar` 组件实现。
- TabBar 仅在四个标签页路由上显示（`/`、`/category`、`/message`、`/profile`）；`/province`、`/detail`、`/list` 等非标签页路由隐藏。
- TabBar 高亮当前路由对应的标签，点击标签通过 `vue-router` 切换到对应路由；重复点击当前标签不产生多余导航副作用。
- 为预留四个标签的激活/未激活图标，图标资源可后续在 `src/assets` 下补充；未提供图标资源时先使用 Vant 内置图标，不影响导航功能。

## Capabilities

### New Capabilities

- `navigation/tab-bar`: 全局底部导航栏。提供首页、分类、消息、我的四个标签入口；仅在标签页路由显示、非标签页隐藏；标签高亮与切换跟随当前路由。

### Modified Capabilities

<!-- 无既有 capability 发生需求级变更 -->

## Impact

- 代码：`src/router/index.js` 新增 `/category`、`/message`、`/profile` 三条路由；新增 `src/views/category/index.vue`、`src/views/message/index.vue`、`src/views/profile/index.vue` 三个页面；TabBar 组件（如 `src/components/TabBar.vue`）与挂载位置（`src/App.vue` 或布局组件）改动。
- 依赖：无新增第三方依赖，`van-tabbar`、`van-tabbar-item` 由 `unplugin-vue-components` 自动按需引入。
- 影响范围：全局页面布局（App 根组件结构）、路由注册；不影响现有页面内部逻辑与 Mock API。
