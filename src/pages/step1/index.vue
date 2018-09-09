<template>
    <div class="step1-container">
        <div class="grid" @click="check(typeConfig['sell'])" :class="{'active': active == typeConfig['sell']}"></div>
        <div class="grid" @click="check(typeConfig['buy'])" :class="{'active': active == typeConfig['buy']}"></div>
        <div class="grid" @click="check(typeConfig['logistics'])" :class="{'active': active == typeConfig['logistics']}"></div>
    </div>
</template>
<script>
    import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle } from "@/utils/common"
    import { mapActions } from "vuex"
    export default {
        data() {
            return {
                active: INDEX_PAGE_LIST_TYPE['sell'],
                typeConfig: INDEX_PAGE_LIST_TYPE
            }
        },
        mounted() {
            setWxNavBarTitle("第一步")
        },
        methods: {
            check(type) {
                this.active = type
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
                }, 500)
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
            &:nth-child(1) {
                background: url("../../../static/images/sell.png") center center no-repeat;
                background-size: 20%;
                &.active {
                    background-image: url("../../../static/images/sell.png");
                }
            }
            &:nth-child(2) {
                background: url("../../../static/images/buy.png") center center no-repeat;
                background-size: 20%;
                &.active {
                    background-image: url("../../../static/images/buy.png");
                }
            }
            &:nth-child(3) {
                background: url("../../../static/images/log.png") center center no-repeat;
                background-size: 20%;
                &.active {
                    background-image: url("../../../static/images/log.png");
                }
            }
        }
    }
</style>

