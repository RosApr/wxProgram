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
    import WXP from 'minapp-api-promise'
    import {
        USER_INFO,
        TOKEN,
        USER_PROFILE,
        OPEN_ID
    } from "@/utils/common"
    import { getUserLoginInfo } from "@/utils/api"
    export default {
        data() {
            return {
                getUserLoginInfoApi: getUserLoginInfo
            }
        },
        async mounted() {
            let res = await WXP.getSetting()
            if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                const userInfoRes = await WXP.getUserInfo({
                    lang: "zh_CN"
                })
                wx.setStorageSync(USER_INFO, userInfoRes.userInfo)
                this.queryUserProfile()
                
            }
        },
        methods: {
            async onGotUserInfo(e) {
                if(e.mp.detail.errMsg != "getUserInfo:ok") return
                wx.setStorageSync(USER_INFO, e.mp.detail.userInfo)
                this.queryUserProfile()
            },
            async queryUserProfile() {
                wx.clearStorageSync()
                let wxLoginRes = await WXP.login()
                if(wxLoginRes.errMsg == "login:ok") {
                    const userProfileRes = await this.getUserLoginInfoApi({code: wxLoginRes.code})
                    const { openId, token, ...userInfo } = userProfileRes.data
                    wx.setStorageSync(TOKEN, token)
                    wx.setStorageSync(OPEN_ID, openId)
                    wx.setStorageSync(USER_PROFILE, userInfo)
                    wx.switchTab({
                        url: '/pages/index/main'
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .authorize-contianer {
        padding: 100rpx 30rpx 0;
        height: 100%;
        background: #fff;
        text-align: center;
        .authorize-icon {
            width: 128rpx;
            height: 128rpx;
            display: block;
            margin: 0 auto;
            padding-bottom: 10rpx;
        }

        .auth-item {
            padding: 5rpx 0;
            margin-bottom: 60rpx;
        }

        .btn-authorize {
            margin: 100rpx 50rpx;
        }
    }
</style>