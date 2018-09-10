<template>
    <div class="setnickname-container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model.lazy="nickname" placeholder="请输入昵称">
            </div>
        </div>
        <button class="weui-btn" type="primary" @click="modify">确认</button>
    </div>
</template>
<script>
    import { setWxNavBarTitle, USER_PROFILE, TOKEN, modifyUserProfileSuccessCallback } from "@/utils/common"
    import { modifyUserProfile } from "@/utils/api"
    import execTip from "@/components/execTip"
    export default {
        data() {
            return {
                nickname: "",
                userProfile: {},
                tip: "",
                showTip: false,
                modifyUserProfileApi: modifyUserProfile,
                cb: modifyUserProfileSuccessCallback,
            }
        },
        mounted() {
            setWxNavBarTitle("修改昵称")
            this.userProfile = wx.getStorageSync(USER_PROFILE)
            this.nickname = this.userProfile.nickname
        },
        methods: {
            async modify() {
                if(this.nickname == "") {
                    this.showTip = true
                    this.tip = "昵称不能为空！"                        
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                const formData = {nickname: this.nickname}
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
    .setnickname-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        input {
            color: #a7a7a7;
            font-size: 30rpx;
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
