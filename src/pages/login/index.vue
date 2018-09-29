<template>
    <div class="login-container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="weui-flex">
            <img class="logo" src="/static/images/login_logo.png" alt="">
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item label">
                <span class="label">手机：</span>
            </div>
            <div class="weui-flex__item">
                <input type="text" placeholder="请输入手机号码" v-model.lazy="phone">
            </div>
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item label">
                <span class="label">密码：</span>
            </div>
            <div class="weui-flex__item">
                <input placeholder="请输入密码" type="password" v-model.lazy="password">
            </div>
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item a-container">
                <div @click="forgetPwd">忘记密码?</div>
            </div>
        </div>
        <div class="weui-flex btn-container">
            <div class="weui-flex__item">
                <button class="weui-btn" @click="login" type="primary">登录</button>
            </div>
        </div>
        <div class="continue-look-container">
            <div @click="continueLook" class="go-register-btn">暂不登录继续浏览</div>
        </div>
        <div class="go-register-container">
            还没有账号?<div @click="goRegister" class="go-register-btn">立即注册</div>
        </div>
    </div>
</template>

<script>
    import execTip from "@/components/execTip"
    import { login } from "@/utils/api"
    import { setWxNavBarTitle, EXEC_REGULAR, openAjaxModel, TOKEN, USER_PROFILE } from "@/utils/common"
    const tipConfig = {
        phone: "请输入手机号！",
        password: "请输入密码！"
    }
    export default {
        data() {
            return {
                phone: "",
                password: "",
                showTip: false,
                tip: "",
                tipConfig: tipConfig,
                loginApi: login
            }
        },
        mounted() {
            setWxNavBarTitle("登录")
        },
        methods: {
            forgetPwd() {
                wx.navigateTo({
                    url: "/pages/getPwd/main"
                })
            },
            goRegister() {
                wx.navigateTo({
                    url: "/pages/register/main"
                })  
            },
            continueLook() {
                wx.switchTab({
                    url: "/pages/index/main"
                })
            },
            async login() {
                if(this.showTip) {
                    return false;
                }
                for(let [key,value] of Object.entries(this.tipConfig)) {
                    if(this[key] == '') {
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
                const formData = {
                    phone: this.phone,
                    password: this.password,
                    type: "login"
                }
                const res = await this.loginApi(formData)
                wx.setStorageSync(TOKEN, res.data.token)
                wx.setStorageSync(USER_PROFILE, res.data.data)
                wx.switchTab({
                    url: "/pages/index/main"
                })
            }
        },
        components: {
            execTip
        }
    }
</script>

<style lang="less" scoped>
    .tip {
        z-index: 9;
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        position: fixed;
        top: -80rpx;
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
    .login-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-flow: column nowrap;
        .weui-flex {
            width: 660rpx;
            margin: 0 auto;
            flex: 1;
            &.btn-container {
                margin-top: 50rpx;
            }
            .logo {
                width: 150rpx;
                margin: 80rpx auto 120rpx;
                height: 190rpx;
            }
        }
        .weui-flex__item {
            margin-bottom : 60rpx;
            &.label {
                line-height: 70rpx;
                flex-grow: 1;
                font-size: 28rpx;
                color: #474747;
            }
        }
        .a-container {
            text-align: right;
            div {
                color: #474747;
                font-size: 26rpx;
            }
        }
        input {
            box-sizing: border-box;
            font-size: 28rpx;
            width: 550rpx;
            flex-basis: 550rpx;
            vertical-align: middle;
            padding-left: 60rpx;
            display: inline-block;
            line-height: 70rpx;
            height: 70rpx;
            border-radius: 200rpx;
            border: 1rpx solid #e8e8e8;
        }
        button {
            border-radius: 200rpx
        }
    }
    .go-register-container {
        text-align: right;
        width: 660rpx;
        margin: 0 auto;
        color: #474747;
        font-size: 26rpx;
        .go-register-btn {
            display: inline-block;
            color: #00a0ea;
        }
    }
    .continue-look-container {
        text-align: center;
        width: 660rpx;
        margin: 0 auto 40rpx;
        color: #474747;
        font-size: 26rpx;
        .go-register-btn {
            display: inline-block;
            color: #666;
        }
    }
</style>
