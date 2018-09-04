<template>
    <div class="authorize-container">
        <div class="auth-item">商城申请获取以下权限：</div>
        <div class="auth-item">获取你的公开信息（头像、昵称等）</div>
        <div class="btn-authorize">
            <button open-type="getUserInfo" type="primary" lang="zh_CN" @getuserinfo="onGotUserInfo">授权</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            onGotUserInfo() {
                console.log(1)
            }
        }
    }
</script>
<style lang="less" scoped>
.authorize-contianer {
  height: 100%;
  background: #fff;
  text-align: center;
  padding-top: 100rpx;
  .authorize-icon {
    width: 128rpx;
    height: 128rpx;
    display: block;
    margin: 0 auto;
    padding-bottom: 10rpx;
  }
  .auth-item {
    padding: 5rpx 0;
  }
  .btn-authorize {
    margin: 100rpx 50rpx;
  }
}
</style>