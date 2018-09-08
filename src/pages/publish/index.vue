<template>
  <div class="address">
    <scroll-view :scroll-y="true" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="publishConfig.list.length!=0" class="item">
        <div class="list"
            @touchstart="startMove"
            :data-index="index"
            @touchmove="deleteGoods"
            @touchend="endMove"
            v-for="(item, index) in publishConfig.list"
            :key="index">
          <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.typeFormat}}</span>
            </div>
            <div class="info">
              <p class="title">{{item.title}}</p>
              <p class="date">有效期：{{item.startdate}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.enddate}}</p>
              <p class="date">浏览次数：{{item.view}}</p>
            </div>
            <div @click="showDetail(item.id, item.type)">查看</div>
          </div>
          <div @click="delAddress(item.id)" class="delete" :style="item.textStyle1">
            <div>
              删除
            </div>
          </div>
        </div>
      </div>
      <div class="no-list-tip" v-else>暂无数据</div>
    </scroll-view>
    <div class="btn-container">
        <div class="btn" @click="goPublish">发布信息</div>
    </div>
  </div>
</template>
<script>
import { setWxNavBarTitle } from "@/utils/common"
import { mapActions, mapState } from "vuex"
export default {
  data() {
    return {
        nowIndex: 0,
        userInfo: {},
        imgUrl: "",
        tranX: 0,
        tranX1: 0,
        startX: "",
        startY: "",
        moveX: "",
        moveY: "",
        moveEndX: "",
        moveEndY: "",
        X: 0,
        Y: "",
        flag: false
      }
  },
  mounted() {
      setWxNavBarTitle("发布中心")
      this.queryPublishList()
  },
  computed: {
    ...mapState([
      "publishConfig"
    ])
  },
  onReachBottom() {
    this.queryPublishList()
  },
  methods: {
    ...mapActions([
      "queryPublishList"
    ]),
    delAddress(id) {
      console.log(id)
    },
    goPublish() {
        wx.navigateTo({
            url: "/pages/step1/main"
        })
    },
    initTextStyle() {
      //滑动之前先初始化数据
      for (var i = 0; i < this.$store.state.publishConfig.list.length; i++) {
        this.$store.state.publishConfig.list[i].textStyle = "";
        this.$store.state.publishConfig.list[i].textStyle1 = "";
      }
    },
    startMove(e) {
      this.initTextStyle();
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    endMove(e) {
      var index = e.currentTarget.dataset.index;
      if (this.X > -50) {
        this.tranX1 = 0;
        this.tranX = 0;
        this.$store.state.publishConfig.list[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.$store.state.publishConfig.list[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -150;
        this.tranX = -150;
        this.$store.state.publishConfig.list[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.$store.state.publishConfig.list[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      }
    },
    showDetail(id, listType) {
      wx.navigateTo({
          url: `/pages/detail/main?type=${listType}&id=${id}&isOwnPublish=my`
      })
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.$store.state.publishConfig.list[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.$store.state.publishConfig.list[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.$store.state.publishConfig.list[index].textStyle = `transform:translateX(${this.tranX}rpx);`;

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.$store.state.publishConfig.list[index].textStyle1 = `transform:translateX(-100rpx);`;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.address {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-bottom: 120rpx;
  box-sizing: border-box;
  .addcont {
    height: 100%;
    .item {
      padding: 0 40rpx;
      .list {
        position: relative;
        padding: 30rpx 0;
        border-bottom: 1rpx solid #d9d9d9;
        &:last-child {
          border: 0;
        }
        .delete {
          position: absolute;
          font-size: 28rpx;
          width: 150rpx;
          top: 0;
          right: -190rpx;
          text-align: center;
          height: 100%;
          line-height: 100%;
          background: #fd8687;
          color: #fff;
          transition: all 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            color: #fff;
          }
        }
      }
    }
  }
  .addresslist {
    width: 100%;
    position: relative;
    transition: all 300ms ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:nth-child(1) {
      width: 100rpx;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      align-self: flex-start;
      color: #65ba4a;
      font-size: 30rpx;
    }
    .info {
      padding: 0 12rpx;
      flex: 1;
      .title {
        color: #383838;
        font-size: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10rpx;
      }
      .date {
        color: #a7a7a7;
        font-size: 28rpx;
      }
    }
    div:nth-child(3) {
      width: 100rpx;
      height: 100%;
      color: #65ba4a;
      font-size: 30rpx;
      text-align: right;
    }
  }
}
.btn-container {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  .btn {
    text-align: center;
    background: #65ba4a;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 34rpx;
    border-radius: 200rpx;
  }
}
.no-list-tip {
  text-align: center;
  color: #ccc;
  font-size: 30rpx;
  padding: 200rpx 0;
}
</style>