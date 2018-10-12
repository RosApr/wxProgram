<template>
    <div class="setphone-container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model="phone" placeholder="请输入手机号">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd verify-container">
                <div :class="{'disable': isSendExecCode}" class="btn" @click="getVerifyCode">{{execBtnText}}</div>
                <input class="weui-input" type="text" v-model="verify" placeholder="请输入验证码">
            </div>
        </div>
        <button class="weui-btn" type="primary" @click="modify">确认</button>
    </div>
</template>
<script>
    import execTip from "@/components/execTip"
    import { getPhoneVerifyCode, modifyUserProfile } from "@/utils/api"
    import { setWxNavBarTitle, EXEC_REGULAR, USER_PROFILE, TOKEN, modifyUserProfileSuccessCallback } from "@/utils/common"
    export default {
        data() {
            return {
                isSendExecCode: false,
                phone: "",
                verify: "",
                execBtnText: "发送验证码",
                showTip: false,
                tip: "",
                type: "reset",
                userProfile: {},
                getPhoneVerifyCodeApi: getPhoneVerifyCode,
                modifyUserProfileApi: modifyUserProfile,
                cb: modifyUserProfileSuccessCallback,
                inter: null
            }
        },
        mounted() {
            setWxNavBarTitle("修改")
            this.userProfile = wx.getStorageSync(USER_PROFILE)
            this.phone = this.userProfile.phone

            this.execBtnText = "发送验证码"
            this.isSendExecCode = false
        },
        onShow() {
        },
        methods: {
            getVerifyCode() {
                if(this.phone == "") {
                    this.tip = "手机号不能为空！"
                    this.showTip = true
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                if(!EXEC_REGULAR.phone.test(this.phone)) {
                    this.tip = "手机号格式不正确!"
                    this.showTip = true
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                this.showTip = false
                if(this.isSendExecCode) {
                    return false
                }
                this.isSendExecCode = true
                let text = 60
                this.inter = setInterval(()=> {
                    this.execBtnText = --text + "s后再次发送"
                    if(text == 0) {
                        clearTimeout(this.inter)
                        this.execBtnText = "发送验证码"
                        this.isSendExecCode = false
                    }
                }, 1000)
                // 发送验证码
                this.getPhoneVerifyCodeApi({
                    phone: this.phone,
                    type: this.type
                })
            },
            async modify() {
                if(this.phone == "") {
                    this.showTip = true
                    this.tip = "手机号不能为空！"                        
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                if(this.verify == "") {
                    this.showTip = true
                    this.tip = "验证码不能为空！"                        
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                if(!EXEC_REGULAR.phone.test(this.phone)) {
                    this.tip = "手机号格式不正确!"
                    this.showTip = true
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                const formData = {phone: this.phone, verify: this.verify}
                const res = await this.modifyUserProfileApi(formData)
                this.cb(res)
            }
        },
        components: {
            execTip
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
