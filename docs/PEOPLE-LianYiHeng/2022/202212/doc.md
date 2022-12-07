## 1.为什么使用前端埋点？

```text
  主要是为了收集产品数据，它的目的是上报相关行为数据，
  相关人员以数据为依据来分析产品在用户端的使用情况，根据分析出来的结果辅助产品优化、迭代、以及新需求的开发。
```

### 名词解释

#### UV（Unique visitor）

```text
  是指通过互联网访问、浏览这个网页的自然人。访问您网站的一台电脑客户端为一个访客。
  00:00-24:00 内相同的客户端只被计算一次。一天内同个访客多次访问仅计算一个UV。
```

#### IP（Internet Protocol）

```text
  独立IP是指访问过某站点的IP总数，以用户的IP地址作为统计依据。00:00-24:00 内相同IP地址之被计算一次。
```

UV 与 IP 区别

```text
  如：你和你的家人用各自的账号在同一台电脑上登录新浪微博，则IP数+1，UV数 +2。
  由于使用的是同一台电脑，所以IP不变，但使用的不同账号，所以 UV+2
```

#### PV（Page View）

```text
  即页面浏览量或点击量，用户每1次对网站中的每个网页访问均被记录1个PV。
  用户对同一页面的多次访问，访问量累计，用以衡量网站用户访问的网页数量。
```

#### VV（Visit View）

```text
  用以统计所有访客1天内访问网站的次数。
  当访客完成所有浏览并最终关掉该网站的所有页面时便完成了一次访问，同一访客1天内可能有多次访问行为，访问次数累计。
```

PV 与 VV 区别

```text
  如：你今天10点钟打开了百度，访问了它的三个页面。
  11点钟又打开了百度，访问了它的两个页面，则PV数+5，VV数+2.PV是指页面的浏览次数，VV是指你访问网站的次数。
```

## 2.目前项目埋点方面存在的痛点？

1.逻辑复用问题：特别是曝光相关的点,需要在业务代码里面做额外的处理，所以逻辑复用很困难，对现有代码的侵入也很严重；

2.埋点在多个项目中分散存在，维护会比较麻烦。

## 3.前端埋点方案

目前主要有 3 种方案：

### 1.手动代码埋点：用户触发某个动作后手动上报数据 优点：是最准确的，可以满足很多定制化的需求。 缺点：埋点逻辑与业务代码耦合到一起，不利于代码维护和复用。

### 2.可视化埋点：通过可视化工具配置采集节点，指定自己想要监测的元素和属性。核心是查找 dom 然后绑定事件，业界比较有名的是 抖音，百度，腾讯，阿里，神策

优点：可以做到按需配置，又不会像全埋点那样产生大量的无用数据。
缺点：比较难加载一些运行时参数；页面结构发生变化的时候，可能就需要进行部分重新配置。

### 3.无埋点：也叫“全埋点”，前端自动采集全部事件并上报埋点数据，在后端数据计算时过滤出有用数据 优点：收集用户的所有端上行为，很全面。 缺点：无效的数据很多、上报数据量大。

## 4.埋点方式

按照获取数据的方式一般分为三类：

页面埋点：统计用户进入或离开页面的各种维度信息，如页面浏览次数（PV）、浏览页面人数（UV）、页面停留时间、浏览器信息等。

点击埋点：统计用户在应用内的每一次点击事件，如财务相关报表的浏览的次数等。

曝光埋点：统计具体区域是否被用户浏览到，如活动的引流入口的显示、投放广告的显示等

## 5.项目埋点实现

目前埋点需求主要有，点击埋点（dom 点击）、页面埋点（主要是 pv）。
再根据我们目前选用的 vue 技术栈，所以考虑了以下两种实现方式：组件方式或者指令方式。

组件式： 需要进行点击埋点的 dom 元素，也有可能是组件，绑定点击事件。当用户触发事件时进行埋点相关处理。
这样就必须绑定点击事件到 dom 上， 但是又不想在文档结构中引入额外的 dom 元素，因为这会增加 dom 结构层级，层级会变得更复杂。

自定义埋点指令式：

```js
/**
 * @description: 埋点方式：点击埋点、页面PV
 * @param {key} 埋点key值
 * @return {el} 点击埋点被绑定的元素
 * 使用策略模式分别处理埋点需求：
 */
const handler = {
  click(key, el) {
    el.addEventListener("click", () => {
      appPointBatchInsert(key);
    });
  },
  pv(key) {
    appPointBatchInsert(key);
  },
};

// 自定义埋点指令
const Point = {};
Point.install = (Vue) => {
  Vue.directive(
    "point",
    {
      inserted(el, binding) {
        const data = binding.value;
        if (data) {
          const { key, type } = data;
          handler[type](key, el);
        } else {
          throw new Error("请补充正确的埋点参数");
        }
      },
    },
    false
  );
};

export default Point;
```

使用示例

```js
import point from "@/utils/directive/point.js";
Vue.use(point);
```

```xml
<!-- 点击埋点 -->
<el-button v-point="{key: 'additionalInquiryClickKey', type: 'click'}">追加</el-button>
<!-- 页面pv埋点: section为页面根元素 -->
<section class="additional-inquiry" v-point="{key: 'additionalInquiryKey', type: 'pv'}">
...
```

## 6.埋点上报

```text
事件上报：通过给元素绑定自定义指令的方式实现(减少对原有代码的侵入)，
将信息存储在缓存池中定时上报，上报之后清空之前的上报信息.
```

```text
问：为什么何将信息存储，而不是实时上报？
    考虑到服务器的压力，采用了定时上报的方式。

问：为什么监听停留时长大于XX秒才进行上报？
  1.服务器的压力问题。
  2.考虑到用户可能做一些没意义的操作，所以停留时长大于XX秒才属于有效页面。
```

#### 实现方法

<!-- 公共缓存池 -->

```js
import Vue from "vue";
// 自定义埋点指令
Vue.directive("buried", {
  bind: (el, binding) => {
    if (binding.value) {
      //这里参数是根据自己业务可以自己定义
      let params = {
        currentUrl: binding.value.currentUrl,
        triggerType: binding.value.triggerType,
        title: binding.value.title,
        frontTriggerType: binding.value.triggerType,
        behavior: binding.value.behavior,
      };
      // 如果是浏览类型，直接保存,目前只考虑点击类型
      if (binding.value.triggerType == "browse") {
        console.log("browse", params);
        //调用后台接口保存数据
      } else if (binding.value.triggerType == "click") {
        // 如果是click类型，监听click事件
        el.addEventListener(
          "click",
          () => {
            // 将操作和内容存储在缓存中定时上报
            let buriedArray = $store.getStorageSync("buriedArray"); // 获取埋点集合
            buriedArray.push(params); // 将埋点集合存入缓存中
            $store.setStorageSync("buriedArray", buriedArray);
          },
          false
        );
      }
    }
  },
});
```

## 7、之后拓展方向

曝光埋点（可能产品需求方向？？） 思路：当指令第一绑定在元素上时监听目标元素，当指令从元素上解绑时停止监听目标元素。

```js
const options = {
  root: null, //默认浏览器视窗
  threshold: 1, //元素完全出现在浏览器视窗内才执行callback函数。
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {});
};
const observer = new IntersectionObserver(callback, options);
const addListenner = (ele, binding) => {
  observer.observe(ele);
};
const removeListener = (ele) => {
  observer.unobserve(ele);
};

// 自定义曝光指令
Vue.directive("point", {
  bind: addListenner,
  unbind: removeListener,
});
```

注意，我们需要创建一个 list 将已经上报过的埋点信息记录下来，防止重复曝光。

```js
let pointList = []; //记录已经上报过的埋点信息
const addListenner = (ele, binding) => {
  if (pointList.indexOf(binding.value) !== -1) return;

  observer.observe(ele);
};
```

我们将要上报的信息绑定在目标元素的 'point-data' 属性中，
当目标元素出现在视窗内时，并停留 5 秒以上(或者规定记录秒数时)时，上报埋点信息。

```js
let timer = {}; //增加定时器对象
const callback = (entries) => {
  entries.forEach((entry) => {
    let pointData = null;
    try {
      pointData = JSON.parse(entry.target.getAttribute("point-data"));
    } catch (e) {
      pointData = null;
      console.error("埋点数据格式异常", e);
    }
    //没有埋点数据取消上报
    if (!pointData) {
      observer.unobserve(entry.target);
      return;
    }

    if (entry.isIntersecting) {
      timer[pointData.id] = setTimeout(function () {
        //上报埋点信息
        sendUtm(pointData).then((res) => {
          if (res.success) {
            //上报成功后取消监听
            observer.unobserve(entry.target);
            visuallyList.push(pointData.id);
            timer[pointData.id] = null;
          }
        });
      }, 5000);
    } else {
      if (timer[pointData.id]) {
        clearTimeout(timer[pointData.id]);
        timer[pointData.id] = null;
      }
    }
  });
};
```

在代码中可以直接使用指令实现曝光埋点了：

```xml
<div v-point="pointData.id" :point-data="JSON.stringify(pointData)"></div>
```

## 尾声

```text
今天的分享到此就结束了，综合以上所讲，就是简易的数据埋点的实现思路。
```
