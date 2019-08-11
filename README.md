# 基于 Vue 实现 CNode

## 项目介绍
本项目是基于 vue 实现 CNode 社区，并对 CNode 社区页面进行了重新布局，主要包括导航页、首页、分页器、文章页、侧边栏、个人信息的展示等模块，并实现了手机端和浏览器端页面自适应。

## 接口说明
本项目使用 CNode 社区官方提供的 API。

## [项目预览](https://sethlee23.github.io/re-cnode/)
### web 端页面
#### 首页
![w_home.png](https://i.loli.net/2019/08/11/zZt6l7IurCEVQL4.png)

#### 分页
![w_home_pagination.png](https://i.loli.net/2019/08/11/au4zXniTYRjW6yK.png)
#### 文章详情页 & 侧边栏 
![w-article.png](https://i.loli.net/2019/08/11/sYI7haBZlw6mcfK.png)
#### 个人信息页面
![w-userInfo.png](https://i.loli.net/2019/08/11/mHRfQCoKaPM3hWB.png)

![w-bottom.png](https://i.loli.net/2019/08/11/bgIGHld7MvCfcPq.png)

### 用户评论
![w-article_reply.png](https://i.loli.net/2019/08/11/4kDeRrTy9xbP8Xa.png)

### 移动端页面
#### 首页
![home.png](https://i.loli.net/2019/08/11/J7S6oTQn9fxL5pg.png)

##### 导航栏
![home_topbar.png](https://i.loli.net/2019/08/11/omDXcyxBs8jZwdH.png)

#### 文章详情页
![article.png](https://i.loli.net/2019/08/11/csVBNylJKfMWOPu.png)

#### 用户评论
![reply.png](https://i.loli.net/2019/08/11/AuRxSCHTP2nmil4.png)

#### 个人信息页面
![userInfo.png](https://i.loli.net/2019/08/11/Nb3lBmJ8Dfr59e1.png)

![userInfo_backtoTop.png](https://i.loli.net/2019/08/11/zGUuHnOTv9EsMbN.png)


## 使用技术
| 技术                                                               | 说明                         |
|--------------------------------------------------------------------|------------------------------|
| [vue](https://cn.vuejs.org/index.html)                                                            | 前端框架                     |
| [vue-router](https://router.vuejs.org/zh/)                                                         | 路由框架                     |
| [jquery](https://jquery.com/)                                      | JavaScript 库                |
| [axios](https://github.com/axios/axios)                            | 基于 Promise 的 http 库      |
| [swiper](https://www.swiper.com.cn/)                               | 触摸滑动插件                 |
| [mint-ui](https://mint-ui.github.io/#!/zh-cn)                      | 基于 Vue.js 的移动端组件库   |
| [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) | markdown 文本样式   |
| [font-spider](http://font-spider.org/)                                                            |中文字体压缩                    |
## 组织结构
```bash
src

|-- App.vue                   #入口文件

|-- main.js                    #入口文件

|-- assets                     #图片文件

|   |--  ...             

|-- components             #组件

|   |-- Article.vue           ##文章详情页

|   |-- Header.vue          ##导航

|   |-- Pagination.vue     ##页码

|   |-- PostList.vue        ##首页列表

|   |-- PostItem.vue        ##首页列表项

|   |-- SliderBar.vue      ## 侧边栏

|   |-- UserInfo.vue     ##个人信息页面

|   |-- article.css 

|   |-- backToTop.vue ##跳转到页面顶部

|   `-- swiper.vue      ## 轮播组件

|-- modules            #模块文件，封装 api 及其调用函数

|   |-- api.js

|   `-- fetch_g.js

`-- router             #路由

    `-- index.js
```

## 项目实现功能
## 首页
- 展示用户信息、显示用户文章相关信息、显示文章最后评论用户相关信息
- 点击导航切换不同文章类别
- 点击回到顶部按钮跳转到页面顶部
- 手机端页面下拉加载下一页
- web 端页面点击分页器加载下一页
## 文章页面
- 展示文章
- 展示用户评论
- 展示用户其他主题文章
- 展示无人回复的评论
## 侧边栏
- 展示文章作者相关信息、点击用户跳转用户详情页
- 展示文章作者其他参与话题，点击跳转相应文章并切换侧边栏信息
- 展示无人回答的问题，点击跳转相应文章并切换侧边栏信息
## 个人信息页面
- 个人信息名片，展示用户github主页，收藏话题数、注册时间、积分
- 轮播展示用户创建的话题
- 轮播展示用户参与的话题

## 其他组件
### Header
- 跳转到不同的分类页面
### backToTop
- 跳转到页面顶部
### swiper
- 轮播组件
### PostItem
- 首页列表项抽离
### Pagination
- 分页器

## TODO
添加登陆页面，下拉刷新、收藏/评论页面
## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```