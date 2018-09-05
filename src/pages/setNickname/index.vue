<template>
    <div class="setnickname-container">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model="nickname" placeholder="请输入昵称">
            </div>
        </div>
        <button class="weui-btn" type="primary">确认</button>
    </div>
</template>
<script>
    import { setWxNavBarTitle } from "@/utils/common"
    export default {
        data() {
            return {
                nickname: "test"
            }
        },
        mounted() {
            setWxNavBarTitle("修改昵称")
        }
    }
</script>
<style lang="less" scoped>
    .setnickname-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        input {
            color: #a7a7a7;
            border-bottom: 2rpx solid #f1f1f1;
        }
        .weui-btn {
            position: absolute;
            left: 60rpx;
            right: 60rpx;
            border-radius: 200rpx;
            bottom: 70rpx;
        }
    }
</style>
