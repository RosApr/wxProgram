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
    import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle } from "@/utils/common"
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

