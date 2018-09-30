<template>
    <div class="user-container">
        <div class="user-inner-container">
            <div @click="navigator('nickname')" class="weui-cell weui-cell_access item border" hover-class="weui-cell_active">
                <div class="weui-cell__bd">昵称</div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{nickname}}</div>
            </div>
            <div @click="navigator('phone')" class="weui-cell weui-cell_access item border" hover-class="weui-cell_active">
                <div class="weui-cell__bd">手机</div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{phone}}</div>
            </div>
            <div @click="navigator('password')" class="weui-cell weui-cell_access item" hover-class="weui-cell_active">
                <div class="weui-cell__bd">密码</div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{password}}</div>
            </div>
        </div>
        <div class="user-inner-container">
            <div @click="navigator('realname')" class="weui-cell weui-cell_access item border marginTop" hover-class="weui-cell_active">
                <div class="weui-cell__bd">法人姓名</div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{realname}}</div>
            </div>
            <div @click="navigator('images')" class="weui-cell weui-cell_access item" hover-class="weui-cell_active">
                <div class="weui-cell__bd">营业执照</div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{images}}</div>
            </div>
        </div>
        <div>{{count}}</div>
    </div>
</template>
<script>
    import {
        setWxNavBarTitle,
        TOKEN,
        USER_PROFILE,
        OPEN_ID
    } from "@/utils/common"
    import { mapState, mapActions, mapMutations } from "vuex"
    export default {
        data() {
            return {
                nickname: "未设置",
                phone: "未设置",
                password: "修改",
                realname: "未设置",
                images: "未设置"
            }
        },
        onShow() {
            if(!wx.getStorageSync(TOKEN)) {
                return wx.navigateTo({
                    url: "/pages/login/main"
                })
            }
            const userProfile = wx.getStorageSync(USER_PROFILE)
            if(userProfile) {
                this.nickname = userProfile.nickname
                this.phone = userProfile.phone
                // this.password = "已设置"
                this.realname = userProfile.realname || "未设置"
                this.images = userProfile.images != null ? "已设置" : "未设置"
            }
        },
        mounted() {
            setWxNavBarTitle("个人中心")
        },
        computed: {
        },
        methods: {
            navigator(type) {
                let path = ""
                switch(type){
                    case "nickname":
                        path = "/pages/setNickname/main"
                        break
                    case "realname":
                        path = "/pages/setName/main"
                        break
                    case "images":
                        path = "/pages/setImg/main"
                        break
                    case "password":
                        path = "/pages/getPwd/main"
                        break
                    case "phone":
                        path = "/pages/setPhone/main"
                        break
                        default:
                            path = ""
                }
                wx.navigateTo({
                    url: path
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .user-container {
        width: 100%;
        height: 100vh;
        background: #f7f7f7;
        padding-top: 30rpx;
        .user-inner-container {
            width: 100%;
            background: #fff;
            padding: 0 30rpx;
            box-sizing: border-box;
            .item {
                padding-left: 0;
                padding-right: 0;
                font-size: 30rpx;
                &:before {
                    left: 0!important;
                    right: 0!important;
                }
                &.marginTop {
                    margin-top: 40rpx;
                }
                background-color: #fff;
                color: 30rpx;
                .weui-cell__bd {
                    color: #383838!important;
                }
                .weui-cell__ft {
                    color: #a7a7a7!important;
                }
            }
        }
    }
</style>