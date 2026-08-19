## 1. 新增标签页与路由

- [x] 1.1 新建 `src/views/category/index.vue` 分类页（占位，含页面标题与基本信息，注释用中文）
- [x] 1.2 新建 `src/views/message/index.vue` 消息页（占位）
- [x] 1.3 新建 `src/views/profile/index.vue` 我的页（占位）
- [x] 1.4 在 `src/router/index.js` 注册 `/category`、`/message`、`/profile` 三条路由，懒加载 `() => import(...)`，与现有路由风格一致

## 2. TabBar 组件

- [x] 2.1 新建 `src/components/TabBar.vue`，使用 `van-tabbar` / `van-tabbar-item` 实现「首页、分类、消息、我的」四个标签，标签配置（标题、路由、图标）集中维护在组件内常量
- [x] 2.2 用 `useRoute()` 判断当前路由，命中标签清单（`/`、`/category`、`/message`、`/profile`）才渲染 TabBar，否则隐藏
- [x] 2.3 激活标签跟随当前路由，切换通过 vue-router 跳转；重复点击当前激活标签不产生副作用
- [x] 2.4 标签图标暂用 Vant 内置图标，图标名集中在标签配置中，便于后续替换

## 3. 全局挂载与布局

- [x] 3.1 在 `src/App.vue` 的 `<router-view>` 之后挂载 `TabBar` 组件
- [x] 3.2 为标签页内容区预留底部导航栏高度（含安全区）的 padding，确保内容不被固定定位的 TabBar 遮挡

## 4. 验证

- [ ] 4.1 `npm run dev` 验证四个标签切换、点击跳转、当前标签高亮正确
- [ ] 4.2 验证 `/province`、`/list`、`/detail` 等非标签页路由不显示 TabBar，返回标签页后恢复显示
- [ ] 4.3 验证标签页内容滚动到底部不被 TabBar 遮挡
- [x] 4.4 `npm run build` 构建通过
