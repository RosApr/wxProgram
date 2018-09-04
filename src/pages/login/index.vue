<template>
    <div class="login-container">
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
                <a href="">忘记密码</a>
            </div>
        </div>
        <div class="weui-flex btn-container">
            <div class="weui-flex__item">
                <button class="weui-btn" @click="login" type="primary">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/utils/api"
    console.log(api)
    export default {
        data() {
            return {
                phone: "",
                password: ""
            }
        },
        methods: {
            login() {
                console.log(this.phone)
                console.log(this.password)
                api.login({
                    phone: this.phone,
                    password: this.password
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        margin-top: 300rpx;
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
                margin-top: 120rpx;
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
            a {
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
</style>
