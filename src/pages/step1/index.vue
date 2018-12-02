<template>
    <div class="step1-container">
        <div class="grid">
            <div class="img-container" @click="check(typeConfig['sell'])" :class="{'active': active == typeConfig['sell']}"></div>
            <p>供应</p>
        </div>
        <div class="grid">
            <div class="img-container" @click="check(typeConfig['buy'])" :class="{'active': active == typeConfig['buy']}"></div>
            <p>求购</p>
        </div>
        <div class="grid">
            <div class="img-container" @click="check(typeConfig['logistics'])" :class="{'active': active == typeConfig['logistics']}"></div>
            <p>物流</p>
        </div>
    </div>
</template>
<script>
    import {
        INDEX_PAGE_LIST_TYPE,
        setWxNavBarTitle,
        USER_PROFILE,
        setDataToStorageIfIsAvailable
    } from "@/utils/common"
    import {
        getUserProfile
    } from "@/utils/api"
    import { mapActions } from "vuex"
    export default {
        data() {
            return {
                active: "",
                typeConfig: INDEX_PAGE_LIST_TYPE
            }
        },
        mounted() {
            setWxNavBarTitle("第一步")
        },
        onShow() {
            this.active = ""
        },
        methods: {
            async check(type) {
                this.active = type
                if(this.active == this.typeConfig["sell"]) {
                    const { data: userProfile } = await getUserProfile({})
                    setDataToStorageIfIsAvailable(USER_PROFILE, userProfile)
                    if(userProfile.checked != 1) {
                        wx.showModal({
                            title: "提示",
                            content: "您的营业执照还在审核中，无法发布!",
                            success (res) {
                                if (res.confirm) {
                                    wx.switchTab({
                                        url: "/pages/me/main"
                                    })
                                } else if (res.cancel) {
                                    wx.switchTab({
                                        url: "/pages/index/main"
                                    })
                                }
                            }
                        })
                    } else {
                        setTimeout(() => {
                            if(type == INDEX_PAGE_LIST_TYPE["logistics"]) {
                                wx.navigateTo({
                                    url: `/pages/step2Log/main?type=${type}`
                                })
                            } else {
                                wx.navigateTo({
                                    url: `/pages/step2/main?type=${type}`
                                })
                            }
                        }, 200)
                    }
                } else {
                    setTimeout(() => {
                        if(type == INDEX_PAGE_LIST_TYPE["logistics"]) {
                            wx.navigateTo({
                                url: `/pages/step2Log/main?type=${type}`
                            })
                        } else {
                            wx.navigateTo({
                                url: `/pages/step2/main?type=${type}`
                            })
                        }
                    }, 200)
                }
            }
        }
    }
</script>
<style lang="less">
    .step1-container {
        width: 100%;
        height: 100vh;
        .grid {
            width: 100%;
            height: 33.333333vh;
            .img-container {
                height: 20vh;
                &.active + p {
                    color: #48cb53;
                }
            }
            p {
                text-align: center;
                color: #878787;
            }
            &:nth-child(1) {
                .img-container {
                    background: url("../../../static/images/sell.png") center center no-repeat;
                    background-size: 20%;
                    &.active {
                        background-image: url("../../../static/images/sell_a.png");
                    }
                }
            }
            &:nth-child(2) {
                .img-container {
                    background: url("../../../static/images/buy.png") center center no-repeat;
                    background-size: 20%;
                    &.active {
                        background-image: url("../../../static/images/buy_a.png");
                    }
                }
            }
            &:nth-child(3) {
                .img-container {
                    background: url("../../../static/images/log.png") center center no-repeat;
                    background-size: 20%;
                    &.active {
                        background-image: url("../../../static/images/log_a.png");
                    }
                }
            }
        }
    }
</style>

