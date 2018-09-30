<template>
    <div class="container">
        <img class="logo" src="/static/images/login_logo.png" alt="">
        <div class="item">商城申请获取以下权限：</div>
        <div class="item">获取你的公开信息（头像、昵称等）</div>
        <div class="btn">
            <button open-type="getUserInfo" type="primary" lang="zh_CN" @getuserinfo="onGotUserInfo">授权</button>
        </div>
        <div class="continue-look-container">
            <div @click="continueLook" class="go-register-btn">暂不授权继续浏览</div>
        </div>
    </div>
</template>
<script>
    import WXP from 'minapp-api-promise'
    import {
        USER_INFO,
        TOKEN,
        USER_PROFILE,
        OPEN_ID,
        queryUserLocationApi,
        saveLocationToStorage,
        defaultCity,
        REGION,
    } from "@/utils/common"
    import { getUserLoginInfo } from "@/utils/api"
    export default {
        data() {
            return {
                getUserLoginInfoApi: getUserLoginInfo
            }
        },
        async onShow() {
            let res = await WXP.getSetting()
            if (res.authSetting['scope.userInfo']) {
                const userInfoRes = await WXP.getUserInfo({
                    lang: "zh_CN"
                })
                console.log(userInfoRes)
                this.queryUserProfile(userInfoRes.userInfo)
            }
        },
        methods: {
            async onGotUserInfo(e) {
                if(e.mp.detail.errMsg != "getUserInfo:ok") return
                this.queryUserProfile(e.mp.detail.userInfo)
            },
            async queryUserProfile(userInfo, isAuthGetLocationApi) {
                wx.setStorageSync(USER_INFO, userInfo)
                let wxLoginRes = await WXP.login()
                console.log(wxLoginRes)
                if(wxLoginRes.errMsg == "login:ok") {
                    const userProfileRes = await this.getUserLoginInfoApi({code: wxLoginRes.code})
                    const { openid, token, data: userProfile } = userProfileRes.data
                    wx.setStorageSync(TOKEN, token)
                    wx.setStorageSync(OPEN_ID, openid)
                    wx.setStorageSync(USER_PROFILE, userProfile)
                    console.log("login ok")
                    wx.navigateTo({
                        url: '/pages/login/main'
                    })
                }
            },
            continueLook() {
                wx.switchTab({
                    url: "/pages/index/main"
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .container {
        padding: 200rpx 30rpx 0;
        height: 100%;
        background: #fff;
        text-align: center;
        .item {
            padding: 5rpx 0;
            margin-bottom: 30rpx;
        }
        .logo {
            width: 150rpx;
            height: 190rpx;
            display: block;
            margin: 0 auto 40rpx;
        }
        .btn {
            width: 100%;
            margin: 100rpx 50rpx 0;
        }
        .continue-look-container {
            text-align: center;
            width: 660rpx;
            margin: 60rpx auto 0;
            color: #474747;
            font-size: 26rpx;
            .go-register-btn {
                display: inline-block;
                color: #666;
            }
        }
    }
</style>