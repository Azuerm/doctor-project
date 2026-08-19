## Context

当前状态（动机见 proposal.md — Why）：应用为 Vue 3 + Vite + Vant 4 + vue-router（`createWebHistory`），路由集中在 `src/router/index.js`，`App.vue` 仅渲染 `<router-view>`，无全局布局层。现有路由 `/`、`/phone`、`/erji`、`/province/:provinceName`、`/list`、`/detail/:productId/:productName`、`/other` 中，四个标签页路由目前只有 `/` 存在。Vant 组件由 `unplugin-vue-components` 自动按需引入；布局基于 rem（`html { font-size: 13.333vw }`，body `max-width: 750px`）。页面约定 `src/views/<name>/index.vue`。

约束：`/province`、`/detail`、`/list` 等是非标签页，不显示 TabBar；TabBar 仅服务四个标签页。

## Goals / Non-Goals

**Goals:**
- 用单一可复用组件实现全局 TabBar，四个标签配置集中维护。
- 显隐控制与路由联动：仅四个标签页路由显示，其余路由隐藏。
- 新增三个标签页（分类/消息/我的）及其路由，均为简单页面，为后续业务留占位。

**Non-Goals:**
- 分类、消息、我的页面的具体业务内容（列表、聊天、个人信息表单等）。
- 图标资源设计（先使用 Vant 内置图标，后续可替换为设计稿图标）。
- 登录态、权限对 TabBar 的差异化控制。

## Decisions

1. **TabBar 挂载位置：全局挂载于 `App.vue`**（`<router-view>` 之后）。
   - 备选：每个页面各自引入 → 重复代码、易遗漏，且非标签页反而要记得不引入，与需求相悖。
   - 选全局挂载，配合路由级显隐控制，天然满足「仅标签页显示」。

2. **显隐控制：集中维护标签路由清单，按当前路由匹配**。
   - 用一份常量数组（如 `tabRoutes = ['/', '/category', '/message', '/profile']`）驱动渲染，`useRoute().path` 命中则显示，否则 `v-if` 隐藏。
   - 备选：在路由 meta 上标记 `showTabBar: true` → 把显隐信息散落在各路由定义里，且需同步 `App.vue` 读取，维护面更大；标签清单仍无法复用。选集中常量，同时组件内可直接依据清单完成高亮。

3. **标签与路由映射、高亮逻辑集中在 TabBar 组件内**。
   - 每个标签配置 `{ name(标题), path(路由), icon(内置图标名) }`，激活态由 `route.path === item.path` 判定；标签页跳转使用 `router.push` 或 `van-tabbar` 的 `route` 模式。重复点击当前标签由 `van-tabbar` 默认行为处理，不产生副作用。

4. **新增路由**：`/category`、`/message`、`/profile`，组件为 `src/views/category/index.vue`、`src/views/message/index.vue`、`src/views/profile/index.vue`，懒加载 `() => import(...)`，与现有路由风格一致。

5. **防止遮挡**：TabBar 使用固定定位（Vant `van-tabbar` 默认 `fixed` 底部固定）；标签页内容区底部预留 TabBar 高度（约 50px，含 iPhone 安全区）的 padding，确保内容不被遮挡。非标签页不显示 TabBar，无需预留。

## Risks / Trade-offs

- [固定定位 TabBar 遮挡内容底部] → 标签页内容容器统一预留底部 padding，并在自测时滚动到底部验证。
- [图标资源缺失，先用内置图标] → 图标集中在标签配置中，后续替换图片/字体图标只改一处，不影响功能。
- [新增三个空页面，路由暴露] → 页面仅为占位，属本变更既定范围，后续迭代填充业务。
- [`/list` 等现有页面不含 TabBar 可能出乎用户预期] → 已按确认的「仅标签页显示」需求设计，如后续需要可再单独变更。

## Migration Plan

- 纯前端增量变更，无数据/接口迁移。
- 实施顺序：新增三个页面与路由 → 新建 TabBar 组件 → 挂载到 `App.vue` 并接入显隐/高亮 → 本地 `npm run dev` 验证四个标签切换、非标签页隐藏、内容不被遮挡。

## Open Questions

无。图标资源与后续页面业务均已明确划为非目标，可在实施后单独迭代。
