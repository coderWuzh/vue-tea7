# vue-tea7
最新版仿茶七网项目，由vue2+nodejs+mysql编写的全栈移动端电商项目
包括登录功能，加入购物车，提交订单，地址页面管理等功能
目前存在bug：
  - better-scroll在渲染页面完成之前计算高度，计算结果不准确，使用setTimeout来延时进行高度计算
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
