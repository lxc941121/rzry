<template>
  <div class="count-down">
    <span style="margin-right: 15px;">{{ surplus | filterTime }}</span>
  </div>
</template>
<script>
/**
 * 能力： 传递给组件一个活动时间，组件根据这个时间去进行计算
 *1、当时间未到开始时间的时候： 展示倒计时
 *2、当时间到了开始时间的时候： 活动进行中
 *3、当时间超过了开始时间的时候：活动已经结束
 */
export default {
  name: "CountDown",
  props: {
    // 活动开始时间
    endHours: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  created() {
    this.computedSurplusTime();
  },
  data() {
    return {
      // 展示活动状态
      surplus: "",
      // 距离活动开始的秒数
      diffSeconds: 0,
      interval: undefined,
    };
  },
  methods: {
    computedSurplusTime() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      const date = new Date();
      /**
       * 当前时间过了开始时间，活动结束
       */
      if (date.getHours() >= this.endHours) {
        this.surplus = "活动已结束";
        return;
      }
      /**
       * 当前时间到了开始时间，活动进行中
       */
      /* if (date.getHours() === this.endHours) {
        this.surplus = "活动进行中";
        return;
      } */
      /**
       * 当前时间未到开始时间的时候：显示倒计时
       * 1、获取当前时间与活动开始时间的秒数差距
       * 2、根据秒数转化为对应的 -> 时分秒
       */
      // 差距时数
      // 开始时间16 ，当前时间 12. 3小时59分59秒
      const diffHours = this.endHours - date.getHours() - 1;
      // 差距分钟数
      const diffMinutes = 60 - date.getMinutes() - 1;
      // 差距秒数
      const diffSeconds = 60 - date.getSeconds();
      // 转化为对应的秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
      // 当时间每过1秒 秒数差距应该 - 1
      this.interval = setInterval(() => {
        this.diffSeconds -= 1;
      }, 1000);
    },
  },
  watch: {
    diffSeconds(newV) {
      // 当前的秒数 / 3600，向下取整，获取到转化的小时数
      const hours = Math.floor(newV / 3600);
      // 当前秒数 / 60，向下取整
      // 获取到所有分钟数 3600 / 60 = 60分钟
      // 对60取模，超过小时数的分钟数
      const minutes = Math.floor(newV / 60) % 60;
      // 当前的秒数 % 60，获取到 超过小时数、分钟数的秒数（秒数）
      const seconds = newV % 60;
      // 拼装数据
      this.surplus = hours + "小时" + minutes + "分钟" + seconds + "秒";
      /**
       * 在当前秒数 变为 0， 需要修改展示数据
       */
      if (newV === 0) {
        this.computedSurplusTime();
      }
    },
  },
};
</script>
