<template>
  <div class="address">
    <scroll-view :scroll-y="true" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div class="list"
            @touchstart="startMove"
            :data-index="index"
            @touchmove="deleteGoods"
            @touchend="endMove"
            v-for="(item, index) in listData"
            :key="index">
          <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.type}}</span>
            </div>
            <div class="info">
                <p class="title">{{item.title}}</p>
              <p class="date">有效期：{{item.startdate}}-{{item.enddate}}</p>
              <p class="date">浏览次数：{{item.view}}</p>
            </div>
            <div @click="toDetail(item.id)">查看</div>
          </div>
          <div @click="delAddress(item.id)" class="delete" :style="item.textStyle1">
            <div>
              删除
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        暂无数据
      </div>
    </scroll-view>
    <div class="btn-container">
        <div class="btn">发布信息</div>
    </div>
  </div>
</template>
<script>
import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
export default {
  computed: {
    // tranX() {},
    // tranX1() {}
  },
  data() {
    return {
        titleConfig: INDEX_PAGE_LIST_TYPE,
        listData: [{"id":15,"title":"123","type":"buy","startdate":"2018-09-27","enddate":"2018-10-22","view":0},{"id":24,"title":"test","type":"sell","startdate":"2018-10-03","enddate":"2018-10-23","view":3},{"id":11,"title":"23123","type":"logistics","startdate":"2018-09-21","enddate":"2018-10-17","view":0}].map(item => {
            item["type"] = this.transformTitle(item["type"])
            return item
        }),
    //   scrollflag: true,
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
    };
  },
  methods: {
    transformTitle(title) {
        let titles = ""
        switch(title) {
            case INDEX_PAGE_LIST_TYPE["sell"]:
                titles = "厨具"
                break
            case INDEX_PAGE_LIST_TYPE["buy"]:
                titles = "求购"
                break
            case INDEX_PAGE_LIST_TYPE["logistics"]:
                titles = "物流"
                break
            default:
                break
        }
        return titles
    },
    initTextStyle() {
      //滑动之前先初始化数据
      for (var i = 0; i < this.listData.length; i++) {
        this.listData[i].textStyle = "";
        this.listData[i].textStyle1 = "";
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
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -150;
        this.tranX = -150;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      }
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      console.log(this.X);
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        // transform:'translateX(' + tranX + 'rpx)'
        console.log("heyushuo");

        console.log(this.listData[index].textStyle);

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        console.log(this.listData[index].textStyle1);
        // this.listData = this.listData;
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
  padding-bottom: 130rpx;
  box-sizing: border-box; // overflow-x: hidden;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  .addcont {
    height: 100%; // padding-bottom: 110rpx;
    // box-sizing: border-box;
    // overflow-x: hidden;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    .item {
      padding: 0 40rpx;
      .list {
        position: relative;
        padding: 30rpx 0;
        border-bottom: 1rpx solid #d9d9d9;
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
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 34rpx;
        border-radius: 200rpx;
    }
}
</style>