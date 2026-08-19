## Purpose

为移动端应用提供全局底部导航栏，让用户可在「首页、分类、消息、我的」四个标签页之间一键切换，并在进入详情类页面时自动隐藏，避免遮挡内容、保持导航一致性。

## ADDED Requirements

### Requirement: 标签页显示全局底部导航栏

系统 SHALL 在标签页路由上显示底部导航栏，包含「首页、分类、消息、我的」四个标签，按固定顺序排列。

#### Scenario: 标签页路由下显示导航栏

- **WHEN** 用户访问 `/`、`/category`、`/message`、`/profile` 中任意一个标签页路由
- **THEN** 页面底部显示导航栏，四个标签按「首页、分类、消息、我的」顺序展示

#### Scenario: 四个标签均展示

- **WHEN** 导航栏渲染完成
- **THEN** 同时展示四个标签，每个标签均有关联的目标路由

### Requirement: 非标签页路由隐藏导航栏

系统 SHALL 在非标签页路由（如 `/province/:provinceName`、`/list`、`/detail/:productId/:productName`）上隐藏底部导航栏。

#### Scenario: 详情页不显示导航栏

- **WHEN** 用户访问 `/list`、`/detail/:productId/:productName`、`/province/:provinceName` 等非标签页路由
- **THEN** 页面底部不显示导航栏

#### Scenario: 从非标签页返回标签页恢复导航栏

- **WHEN** 用户从非标签页路由导航回任意标签页路由
- **THEN** 导航栏重新显示

### Requirement: 标签高亮跟随当前路由

系统 SHALL 将导航栏中与当前路由匹配的标签标记为激活高亮状态；当前路由不属于任何标签时，导航栏不激活任何标签。

#### Scenario: 当前路由高亮对应标签

- **WHEN** 用户位于 `/message`
- **THEN** 导航栏中「消息」标签处于激活高亮状态，其余标签不激活

#### Scenario: 非标签路由不高亮

- **WHEN** 当前路由不是任一标签对应的路由
- **THEN** 导航栏中没有任何标签处于激活状态

### Requirement: 点击标签切换到对应路由

系统 SHALL 在用户点击标签时导航到该标签对应的路由；点击当前已激活的标签不产生报错或重复导航副作用。

#### Scenario: 点击标签跳转

- **WHEN** 用户位于首页并点击「我的」标签
- **THEN** 路由切换到 `/profile` 页面，导航栏中「我的」标签激活

#### Scenario: 重复点击当前标签

- **WHEN** 用户位于 `/category` 并点击「分类」标签
- **THEN** 页面保持在 `/category`，不发生报错

### Requirement: 标签路由可直达访问

系统 SHALL 为四个标签提供可直达的路由：`/`（首页）、`/category`（分类）、`/message`（消息）、`/profile`（我的），直接访问时能正常渲染对应页面。

#### Scenario: 直接访问标签路由

- **WHEN** 用户直接访问 `/profile`
- **THEN** 页面渲染「我的」页面内容，且底部导航栏中「我的」标签激活

#### Scenario: 直接访问分类路由

- **WHEN** 用户直接访问 `/category`
- **THEN** 页面渲染「分类」页面内容，且底部导航栏中「分类」标签激活

### Requirement: 页面内容不被导航栏遮挡

系统 SHALL 确保标签页的内容区域底部预留导航栏高度空间，使页面内容在导航栏显示时不被遮挡。

#### Scenario: 内容滚动到底部仍完整可见

- **WHEN** 标签页内容滚动到底部
- **THEN** 最后一项内容仍完整可见，不被导航栏覆盖
