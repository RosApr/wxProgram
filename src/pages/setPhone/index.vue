<template>
    <div class="setphone-container">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model.lazy="phone" placeholder="请输入手机号">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd verify-container">
                <div :class="{'disable': isSendExecCode}" class="btn" @click="getVerifyCode">{{execBtnText}}</div>
                <input class="weui-input" type="text" v-model.lazy="verify" placeholder="请输入验证码">
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
                isSendExecCode: false,
                phone: "test",
                verify: "",
                execBtnText: "发送验证码"
            }
        },
        mounted() {
            setWxNavBarTitle("修改")
            this.execBtnText = "发送验证码"
            this.isSendExecCode = false
        },
        methods: {
            getVerifyCode() {
                if(this.isSendExecCode) {
                    return false
                }
                this.isSendExecCode = true
                let text = 60
                let inter = setInterval(()=> {
                    this.execBtnText = --text + "s后再次发送"
                    if(text == 0) {
                        clearTimeout(inter)
                        this.execBtnText = "发送验证码"
                        this.isSendExecCode = false
                    }
                }, 1000)
            }
        }
    }
</script>
<style lang="less" scoped>
    .setphone-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        input {
            color: #a7a7a7;
            border-bottom: 2rpx solid #f1f1f1;
            font-size: 30rpx;
        }
        .verify-container {
            position: relative;
            .btn {
                z-index: 10;
                position: absolute;
                right: 0;
                top: 40%;
                transform: translateY(-50%);
                font-size: 24rpx;
                color: #4dc959;
                border: 1rpx solid #4dc959;
                padding: 8rpx 10rpx;
                &.disable {
                    color: #c2c2c2;
                    border-color: #c2c2c2;
                }
            }
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
