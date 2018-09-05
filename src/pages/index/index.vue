<template>
    <div class="index-container">
        <!-- <div class="search-bar">
            <picker mode="multiSelector" @change="bindRegionChange" :value="region">
                <input type="text" placeholder="身份、城市、区县" v-model="address">
            </picker>
        </div> -->
        <div @click="handleClick">{{count}}</div>
        <div class="tab-container">
            <div class="tab-header-container">
                <div class="grid"
                    :class="{'active': activeTab == tabConfig['sell']}"
                    @click="changeActiveTab(tabConfig['sell'])">
                    <span>厨具</span>
                </div>
                <div class="grid"
                    :class="{'active': activeTab == tabConfig['buy']}"
                    @click="changeActiveTab(tabConfig['buy'])">
                    <span>求购</span>
                </div>
                <div class="grid"
                    :class="{'active': activeTab == tabConfig['logistics']}"
                    @click="changeActiveTab(tabConfig['logistics'])">
                    <span>物流</span>
                </div>
            </div>
            <div class="list" v-if="indexConfig.list.length > 0">
                <template v-if="activeTab != tabConfig['logistics']">
                    <div class="item sell"
                        v-for="(item, index) in indexConfig.list"
                        :key="index"
                    >
                        <div class="grid img" :style="{backgroundImage: 'url(' + item.images[0] + ')'}"></div>
                        <div class="grid desc">
                            <div class="title">{{item.title}}</div>
                            <div class="date">有效期：{{item.startdate}}-{{item.enddate}}</div>
                            <div class="place">产地：<span>{{item.place}}</span></div>
                            <div class="price">
                                <span class="price-symbol">¥</span>
                                <span class="price-number">{{item.price}}</span>
                                <span class="price-tip">(含税)</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="item logistics weui-cell weui-cell_access item border"
                        v-for="(item, index) in indexConfig.list"
                        :key="index"
                    >
                        <div class="grid desc">
                            <p class="title">{{item.title}}</p>
                            <p class="date">出发时间：{{item.startdate}}</p>
                            <p class="area">
                                {{item.rmation}}-{{item.destination}}
                                <span>{{item.type}}</span>
                            </p>
                        </div>
                        <div class="grid money">
                            <div class="inner-container">
                                <p>
                                    <span class="symbol">¥</span>
                                    <span class="price">{{item.price}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
                
            </div>
            <div class="no-data-tip" v-else>
                暂无数据...
            </div>
        </div>
    </div>
</template>
<script>
    import wx from "@/utils/wx"
    import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
    import { mapState, mapActions, mapMutations } from "vuex"
    export default {
        data() {
            return {
                region: [],
                address: "",
                tabConfig: INDEX_PAGE_LIST_TYPE,
                activeTab: INDEX_PAGE_LIST_TYPE["sell"]
            }
        },
        mounted() {
            // 初始化获取列表
            this.getIndexList({
                listType: this.activeTab
            })
        },
        computed: {
            ...mapState([
                "indexConfig",
            ])
        },
        onReachBottom() {
            // 加载更多
            this.getIndexList({
                listType: this.activeTab
            })
        },
        methods: {
            ...mapMutations([
            ]),
            ...mapActions([
                "getIndexList"
            ]),
            // 切换tab
            changeActiveTab(active) {
                this.activeTab = active
                this.getIndexList({
                    listType: active
                })
            },
            bindRegionChange(e) {
                var value = e.mp.detail.value
                console.log(value)
            },
            handleClick() {
            }
        }
    }
</script>
<style lang="less" scoped>
    .index-container {
        .tab-container {
            width: 100%;
            .tab-header-container {
                height: 120rpx;
                line-height: 120rpx;
                display: flex;
                flex-flow: row nowrap;
                justify-items: space-around;
                align-content: center;
                .grid {
                    text-align: center;
                    flex: 1;
                    color: #383838;
                    font-size: 32rpx;
                    transition: all .3s ease-in-out;
                    span {
                        position: relative;
                        &:after {
                            content: "";
                            transition: all .3s ease-in-out;
                            position: absolute;
                            bottom: -12rpx;
                            left: 4rpx;
                            right: 4rpx;
                            height: 6rpx;
                            background: transparent;
                        }
                    }
                    &.active {
                        color: #54cb60;
                        span {
                            &:after {
                                content: "";
                                background: #54cb60;
                            }
                        }
                    }
                }
            }
            .list {
                padding: 0 18rpx;
                .item {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-content: center;
                    margin-bottom: 24rpx;
                    &.sell {
                        .grid {
                            flex: 1;
                            &.img {
                                flex-grow: 0;
                                width: 270rpx;
                                flex-basis: 270rpx;
                                height: 270rpx;
                                overflow: hidden;
                                background-size: contain;
                                background-position: center;
                                background-repeat: no-repeat; 
                            }
                            &.desc {
                                padding-left: 20rpx;
                                .title {
                                    color: #383838;
                                    font-size: 28rpx;
                                }
                                .date {
                                    color: #a7a7a7;
                                    font-size: 28rpx;
                                }
                                .place {
                                    color: #a7a7a7;
                                    font-size: 28rpx;
                                    span {
                                        color: #54cb60;
                                    }
                                }
                                .price {
                                    color: #e67a22;
                                    .price-symbol {
                                        font-size: 32rpx;
                                        vertical-align: top;
                                    }
                                    .price-number {
                                        font-size: 58rpx;
                                    }
                                    .price-tip {
                                        font-size: 30rpx;
                                        margin-left: 8rpx;
                                    }
                                }
                            }
                        }
                    }
                    &.logistics {
                        margin-bottom: 0;
                        .grid {
                            flex: 1;
                            &.desc {
                                color: #a7a7a7;
                                font-size: 28rpx;
                                .title {
                                    margin-bottom: 10rpx;
                                    color: #383838;
                                }
                                .area {
                                    .type {
                                        margin-left: 100rpx;
                                    }
                                }
                            }
                            &.money {
                                min-width: 220rpx;
                                flex: 0;
                                color: #e67a22;
                                font-size: 58rpx;
                                text-align: right;
                                .inner-container {
                                    height: 100%;
                                    display: flex;
                                    flex-flow: column nowrap;
                                    justify-content: center;
                                    p {
                                        display: inline-block;
                                        flex: 0;
                                    }
                                }
                                .symbol {
                                    vertical-align: text-top;
                                    font-size: 30rpx;
                                }
                            }
                        }
                    }
                }
                // <div
                //     class="item logistics"
                //     v-for="(item, index) in indexConfig.list"
                //     :key="index"
                // >
                //     <div class="grid desc">
                //         <p class="title">{{item.title}}</p>
                //         <p class="date">出发时间：{{item.date}}</p>
                //         <p class="area">
                //             {{item.rmation}}-{{item.destination}}
                //             <span>{{item.type}}</span>
                //         </p>
                //     </div>
                //     <div class="grid money">
                //         <span class="symbol">¥</span>
                //         <span class="price">{{item.price}}</span>
                //     </div>
                // </div>
            }
            .no-data-tip {
                font-size: 32rpx;
                padding-top: 100rpx;
                color: #383838;
                text-align: center;
            }
        }
    }
</style>
