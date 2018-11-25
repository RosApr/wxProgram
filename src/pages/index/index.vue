<template>
    <div class="index-container">
        <div class="search-bar">
            <div class="grid label">
                <picker mode="multiSelector" @change="regionChange" @columnchange="regionColumnChange" :value="regionIndex" :range="regionDataComputed">
                    <div class="border height arrow"><span class="text">{{place}}</span><span class="arrow">&gt;</span></div>
                </picker>
            </div>
            <div class="grid input">
                <input placeholder-style='color:#fff;' type="text" placeholder="搜索" @click="goSearchPage">
            </div>
        </div>
        <div class="tab-container">
            <div class="tab-header-container">
                <div class="grid"
                    :class="{'active': activeTab == tabConfig['sell']}"
                    @click="changeActiveTab(tabConfig['sell'])">
                    <span>供应</span>
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
                        @click="showDetail(item.id, activeTab)"
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
                        @click="showDetail(item.id, activeTab)"
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
                数据加载中...
            </div>
        </div>
        <div class="auth-location-layer" :class="{'active': showAuthLocationLayer}">
            <div class="content">
                <div class="title">是否授权当前位置</div>
                <div class="desc">需要获取您的地理位置，请确认授权，否则定位功能将无法使用</div>
                <div class="btn-container">
                    <div class="btn cancel" @click="hideAuthLayer(false)">取消</div>
                    <div class="btn confirm">
                        <button open-type="openSetting" type="primary" lang="zh_CN" @opensetting="onAuthLocation">授权</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import wx from "@/utils/wx"
    import WXP from 'minapp-api-promise'
    import regionArray from "@/utils/region"
    import { 
        INDEX_PAGE_LIST_TYPE,
        REGION,
        saveLocationToStorage,
        queryUserLocationApi,
        defaultCity,
        isInStorageAndReturn,
        setDataToStorageIfIsAvailable
    } from "@/utils/common"
    import { mapState, mapActions } from "vuex"
    export default {
        data() {
            return {
                region: [],
                address: "",
                tabConfig: INDEX_PAGE_LIST_TYPE,
                activeTab: INDEX_PAGE_LIST_TYPE["sell"],
                regionData: regionArray,
                regionIndex: [0,0],
                regionSecond: 0,
                place: regionArray[1][0][0],
                showAuthLocationLayer: false
            }
        },
        mounted() {
            this.getUserLocation()
        },
        computed: {
            ...mapState([
                "indexConfig",
            ]),
            regionDataComputed() {
                const secondColumn = this.regionData[1][this.regionSecond]
                return [this.regionData[0], secondColumn]
            }
        },
        onReachBottom() {
            this.queryIndexList({
                listType: this.activeTab
            })
        },
        methods: {
            ...mapActions([
                "queryIndexList"
            ]),
            hideAuthLayer(layerShowStatus=false) {
                saveLocationToStorage({city:defaultCity})
                this.setCurrentRegionCascader(defaultCity)
                this.queryIndexList({
                    listType: this.activeTab,
                    region: defaultCity
                })
                return this.showAuthLocationLayer = layerShowStatus
            },
            goSearchPage() {
                wx.navigateTo({
                    url: "/pages/search/main"
                })
            },
            async onAuthLocation(AuthRes) {
                this.hideAuthLayer()
                const isAuthGetLocationApi = AuthRes.mp.detail.authSetting["scope.userLocation"]
                let region = defaultCity
                if(isAuthGetLocationApi) {
                    region = await this.queryUserLocation()
                }
                saveLocationToStorage({city:region})
                this.setCurrentRegionCascader(region)
                this.queryIndexList({
                    listType: this.activeTab,
                    region
                })
            },
            setCurrentRegionCascader(currentCity) {
                this.regionData[1].forEach((citysArray, citysIndex) => {
                   citysArray.forEach((city, cityIndex) => {
                       if(city.indexOf(currentCity) >= 0) {
                           this.regionSecond = citysIndex
                           this.regionIndex = [citysIndex, cityIndex]
                           this.place = this.regionData[1][citysIndex][cityIndex]
                       }
                   })
                })
            },
            regionChange(e) {
                const values = e.mp.detail.value
                this.place = this.regionData[1][values[0]][values[1]]
                saveLocationToStorage({city: this.place})
                this.queryIndexList({
                    listType: this.activeTab,
                    region: this.place
                })
            },
            regionColumnChange(e) {
                if(e.mp.detail.column === 0) {
                    this.regionSecond = e.mp.detail.value
                    this.regionIndex = [e.mp.detail.value, 0]
                }
            },
            showDetail(id, listType) {
                wx.navigateTo({
                    url: `/pages/detail/main?type=${listType}&id=${id}`
                })
            },
            changeActiveTab(active) {
                this.activeTab = active
                this.queryIndexList({
                    listType: active
                })
            },
            bindRegionChange(e) {
                var value = e.mp.detail.value
            },
            returnRegion(region=defaultCity) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(region)
                    }, 100)
                })
            },
            async queryUserLocation() {
                const locationRes = await WXP.getLocation({
                    type: "wgs84",
                })
                if(locationRes.errMsg == "getLocation:ok") {
                    const cityRes = await queryUserLocationApi(locationRes)
                    if(cityRes.errMsg == "request:ok") {
                        const { city } = cityRes.data.result.addressComponent
                        return this.returnRegion(city)
                    }
                }
                return this.returnRegion()
            },
            async getUserLocation() {
                const regionStorageInfo = isInStorageAndReturn(REGION)
                const userSettingRes = await WXP.getSetting()
                const isAuthGetLocationApi = userSettingRes.authSetting["scope.userLocation"]
                if(regionStorageInfo.status && isAuthGetLocationApi) {
                    const region = regionStorageInfo[REGION]
                    saveLocationToStorage({city: region})
                    this.setCurrentRegionCascader(region)
                    this.queryIndexList({
                        listType: this.activeTab,
                        region
                    })
                    return this.returnRegion(region)
                } else {
                    if(isAuthGetLocationApi) {
                        const region = await this.queryUserLocation()
                        saveLocationToStorage({city:region})
                        this.setCurrentRegionCascader(region)
                        this.queryIndexList({
                            listType: this.activeTab,
                            region
                        })
                    } else if(isAuthGetLocationApi == undefined){
                        wx.getLocation({
                            type: "wgs84",
                            success: async locationRes => {
                                const cityRes = await queryUserLocationApi(locationRes)
                                let city = ""
                                if(cityRes.errMsg == "request:ok") {
                                    city = cityRes.data.result.addressComponent.city
                                }
                                saveLocationToStorage({city:city})
                                this.setCurrentRegionCascader(city)
                                this.queryIndexList({
                                    listType: this.activeTab,
                                    region: city
                                })
                            },
                            fail: async res => {
                                saveLocationToStorage({city:defaultCity})
                                this.setCurrentRegionCascader(defaultCity)
                                this.queryIndexList({
                                    listType: this.activeTab,
                                    region: defaultCity
                                })
                            }
                        })
                    } else if(isAuthGetLocationApi == false) {
                        this.hideAuthLayer(true)
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .search-bar {
        display: flex;
        justify-items: space-around;
        align-items: center;
        flex-flow: row nowrap;
        background-color: #36ca45;
        height: 120rpx;
        line-height: 120rpx;
        .grid {
            position: relative;
            &.label {
                padding-right: 30rpx;
                color: #fff;
                font-size: 32rpx;
                padding-left: 30rpx;
                .arrow {
                    .arrow {
                        display: inline-block;
                        vertical-align: middle;
                        transform: rotateZ(90deg);
                        font-size: 28rpx;
                        color: #fff;
                    }
                    .text {
                        padding-right: 10rpx;
                    }
                }
            }
            &.input {
                flex: 1;
                padding: 0 30rpx;
                height: 100%;
                input {
                    font-size: 28rpx;
                    color: #fff;
                    padding-left: 30rpx;
                    border: 1rpx solid #fff;
                    border-radius: 100rpx;
                    height: 60rpx;
                    line-height: 60rpx;
                    margin-top: 30rpx;
                }
            }
        }
    }
    .index-container {
        .auth-location-layer {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 99;
            background-color: rgba(0, 0, 0, .6);
            display: none;
            &.active {
                display: block;
            }
            .content {
                background-color: #fff;
                width: 60%;
                margin: 300rpx auto 0;
                padding: 20rpx 0 0;
                box-sizing: border-box;
                .title {
                    padding: 20rpx 40rpx;
                    font-size: 30rpx;
                    color: #666;
                }
                .desc {
                    font-size: 28rpx;
                    padding: 0 40rpx;
                    margin-top: 30rpx;
                    color: #ccc;
                }
                .btn-container {
                    width: 100%;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    .btn {
                        flex: 1;
                        width: 50%;
                        height: 100%;

                        &.cancel {
                            background: #a7a7a7;
                            box-sizing:border-box;
                            font-size:18px;
                            text-align:center;
                            text-decoration:none;
                            line-height:2.55555556;
                            border-radius:0;
                            color: #fff;
                        }
                        &.confirm {
                            button {
                                border-radius:0;
                            }
                        }
                    }
                }
                
            }
        }
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
                        color:#36ca45;
                        span {
                            &:after {
                                content: "";
                                background: #36ca45;
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
                                font-size: 28rpx;
                                .title {
                                    color: #383838;
                                    font-size: 30rpx;
                                    display: -webkit-box;
                                    word-break: break-all;   
                                    -webkit-box-orient: vertical;   
                                    -webkit-line-clamp:2;    
                                    overflow: hidden;    
                                    text-overflow:ellipsis;
                                }
                                .date {
                                    color: #a7a7a7;
                                    margin-top: 10rpx;
                                }
                                .place {
                                    color: #a7a7a7;
                                    span {
                                        color: #36ca45;
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
                                    font-size: 30rpx;
                                    margin-bottom: 10rpx;
                                    color: #383838;
                                    display: -webkit-box;
                                    line-height: 40rpx;   
                                    word-break: break-all;   
                                    -webkit-box-orient: vertical;   
                                    -webkit-line-clamp:2;    
                                    overflow: hidden;    
                                    text-overflow:ellipsis;
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
