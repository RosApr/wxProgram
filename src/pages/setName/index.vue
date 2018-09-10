<template>
    <div class="setnickname-container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" v-model.lazy="realname" placeholder="请输入法人姓名">
            </div>
        </div>
        <button class="weui-btn" @click="modify" type="primary">确认</button>
    </div>
</template>
<script>
    import execTip from "@/components/execTip"
    import { setWxNavBarTitle, USER_PROFILE, TOKEN, modifyUserProfileSuccessCallback } from "@/utils/common"
    import { modifyUserProfile } from "@/utils/api"
    export default {
        data() {
            return {
                realname: "",
                showTip: false,
                userProfile: {},
                tip: "",
                modifyUserProfileApi: modifyUserProfile,
                cb: modifyUserProfileSuccessCallback,
            }
        },
        mounted() {
            setWxNavBarTitle("修改法人姓名")
            this.userProfile = wx.getStorageSync(USER_PROFILE)
            this.realname = this.userProfile.realname
        },
        methods: {
            async modify() {
                if(this.realname == "") {
                    this.showTip = true
                    this.tip = "法人姓名不能为空！"                        
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
                const formData = {realname: this.realname}
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
