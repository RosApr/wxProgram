<template>
    <div class="setpwd-container">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="password" v-model.lazy="pwd" placeholder="原密码">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="password" v-model.lazy="newPwd" placeholder="新密码">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="password" v-model.lazy="newPwdCopy" placeholder="确认新密码">
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
                nickname: "test",
                newPwd: "",
                newPwdCopy: ""
            }
        },
        mounted() {
            setWxNavBarTitle("修改密码")
        }
    }
</script>
<style lang="less" scoped>
    .setpwd-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        input {
            font-size: 30rpx;
            color: #a7a7a7;
            border-bottom: 2rpx solid #f1f1f1;
        }
        .weui-cell {
            &:before,
            &:after {
                opacity: 0;
            }
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
