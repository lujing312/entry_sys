### 运营管理系统

#### 概述
  系统分为一下几个模块
  - 录入表型
  - 录入药物

#### 起本地服务

``` bash
# clone registry
git clone git@gitlab.com:lasoplanet/fe/entry_sys.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

#### 访问 http://localhost:8080 打开 dev 页面

#### 本地 mock 数据开发
将 src/main.js 中的 mock 代码注释去掉，即从

``` bash

// import Mock from './mock'
// Mock.init()

```
改为
```

import Mock from './mock'
Mock.init()

```

#### 本地如何访问 dev 服务接口
- [下载 Charles](https://www.charlesproxy.com/download/)
- 将工程下 manage-map-remote.xml 导入 Charles -> Tools -> Map Remote
- 关闭其他代理工具，比如 Shadowsocks 等
- 勾选 Charles -> Proxy -> macOS Proxy （每次重启 Charles 都需要手动勾选）

#### 如何编译打包

``` bash
# build for beta with minification
npm run beta

# build for production with minification
npm run prod
```
