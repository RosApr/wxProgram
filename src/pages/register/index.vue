<template>
    <div class="register-container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="item">
            <div class="grid label">
                昵称：
            </div>
            <div class="grid input">
                <input class="height border" type="text" v-model="nickname">
            </div>
        </div>
        <div class="item">
            <div class="grid label">
                手机号：
            </div>
            <div class="grid input verify-container">
                <input class="height border verfiy-input" type="text" v-model="phone">
                <div :class="{'disable': isSendExecCode}" class="btn" @click="getVerifyCode">{{execBtnText}}</div>
            </div>
        </div>
        <div class="item">
            <div class="grid label">
                验证码：
            </div>
            <div class="grid input">
                <input class="height border" type="text" v-model="verify">
            </div>
        </div>
        <div class="item">
            <div class="grid label">
                密码：
            </div>
            <div class="grid input">
                <input class="height border" type="password" v-model="password">
            </div>
        </div>
        <div class="item">
            <div class="grid label">
                确认密码：
            </div>
            <div class="grid input">
                <input class="height border" type="password" v-model="copyPwd">
            </div>
        </div>
        <button class="weui-btn" @click="register" type="primary">注册</button>
    </div>
</template>
<script>
    import { setWxNavBarTitle, EXEC_REGULAR, TOKEN, USER_PROFILE, setDataToStorageIfIsAvailable } from "@/utils/common"
    import { register, getPhoneVerifyCode } from "@/utils/api"
    import execTip from "@/components/execTip"
    const tipConfig = {
        nickname: "请输入昵称!",
        phone: "请输入手机号!",
        password: "请输入密码!",
        copyPwd: "请输入确认密码!",
        verify: "请输入验证码!",
    }
    export default {
        data() {
            return {
                phone: "",
                password: "",
                copyPwd: "",
                nickname: "",
                verify: "",
                type: "register",
                isSendExecCode: false,
                execBtnText: "发送验证码",
                tip: "",
                showTip: false,
                tipConfig: tipConfig,
                registerApi: register,
                getPhoneVerifyCodeApi: getPhoneVerifyCode
            }
        },
        onUnload() {
            this.phone = ""
            this.password = ""
            this.copyPwd = ""
            this.nickname = ""
            this.verify = ""
        },
        mounted() {
            setWxNavBarTitle("注册")
            this.execBtnText = "发送验证码"
            this.isSendExecCode = false
        },
        methods: {
            async register() {
                if(this.showTip) {
                    return false;
                }
                for(let [key,value] of Object.entries(this.tipConfig)) {
                    if(this[key] == "") {
                        this.showTip = true
                        this.tip = value
                        return setTimeout(() => {
                            this.showTip = false
                        }, 2000)
                    }
                }
                if(!EXEC_REGULAR.phone.test(this.phone)) {
                    this.tip = "手机号格式不正确!"
                    this.showTip = true
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                if(this.password != this.copyPwd) {
                    this.tip = "密码不一致，请再次输入!"
                    this.showTip = true
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                const registerData = {}
                // make form data
                for(let [key,value] of Object.entries(this.tipConfig)) {
                    registerData[key] = this[key]
                }
                const res = await this.registerApi(registerData)
                setDataToStorageIfIsAvailable(TOKEN, res.data.token)
                setDataToStorageIfIsAvailable(USER_PROFILE, res.data.data)
                wx.switchTab({
                    url: "/pages/index/main"
                })
            },
            getVerifyCode() {
                if(this.phone == "") {
                    this.tip = this.tipConfig["phone"]
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
                let inter = setInterval(()=> {
                    this.execBtnText = --text + "s后再次发送"
                    if(text == 0) {
                        clearTimeout(inter)
                        this.execBtnText = "发送验证码"
                        this.isSendExecCode = false
                    }
                }, 1000)
                // 发送验证码
                this.getPhoneVerifyCodeApi({
                    phone: this.phone,
                    type: this.type
                })
            }
        },
        components: {
            execTip
        }
    }
</script>
<style lang="less" scoped>
    .register-container {
        position: relative;
        padding: 60rpx 30rpx 40rpx;
        .tip {
            z-index: 9;
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            position: fixed;
            top: -80rpx;
            left: 0;
            right: 0;
            font-size: 32rpx;
            color: #fff;
            background: red;
            transform: all .3s ease;
            opacity: 0;
            &.active {
                top: 0;
                opacity: 1;
            }
        }
        .item {
            z-index: 2;
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40rpx;
            margin-top: 10rpx;
            .grid {
                &.input {
                    flex: 1;
                    color: #8c8c8c;
                    font-size: 28rpx;
                    min-height: 48rpx;
                    .height {
                        height: 70rpx;
                        line-height: 70rpx;
                    }
                    .border {
                        position: relative;
                        padding-left: 20rpx;
                        border: 1rpx solid #e8e8e8;
                        border-radius: 100rpx;
                    }
                    &.verify-container {
                        .verfiy-input {
                            width: 56%;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 4%;
                            box-sizing: border-box;
                        }
                        position: relative;
                        .btn {
                            box-sizing: border-box;
                            z-index: 10;
                            text-align: center;
                            width: 40%;
                            vertical-align: middle;
                            display: inline-block;
                            font-size: 24rpx;
                            color: #4dc959;
                            border: 1rpx solid #4dc959;
                            border-radius: 8rpx;
                            padding: 8rpx 10rpx;
                            &.disable {
                                color: #e8e8e8;
                                border-color: #e8e8e8;
                            }
                        }
                    }
                }
                &.label {
                    width: 160rpx;
                    text-align: right;
                    height: 70rpx;
                    line-height: 70rpx;
                    .badge {
                        color: #e03539;
                        font-size: 30rpx;
                    }
                    color: #474747;
                    font-size: 28rpx;
                }
            }
        }
        .weui-btn {
            margin-top: 120rpx;
            width: 100%;
            border-radius: 200rpx;
        }
    }
</style>
