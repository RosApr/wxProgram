<template>
    <div class="index-container">
        <!-- <div class="search-bar">
            <picker mode="multiSelector" @change="bindRegionChange" :value="region">
                <input type="text" placeholder="身份、城市、区县" v-model="address">
            </picker>
        </div> -->
        <div class="tab-container">
            <div class="tab-header-container">
                <div class="grid" :class="{'active': activeTab == 0}" @click="changeActiveTab(0)">
                    <span>厨具</span>
                </div>
                <div class="grid" :class="{'active': activeTab == 1}" @click="changeActiveTab(1)">
                    <span>求购</span>
                </div>
                <div class="grid" :class="{'active': activeTab == 2}" @click="changeActiveTab(2)">
                    <span>物流</span>
                </div>
            </div>
            <div class="list" v-if="list.length > 0">
                <div class="item" v-for="(item, index) in list" :key="index">
                    <div class="grid img" :style="{backgroundImage: 'url(' + item.images[0] + ')'}">
                    </div>
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
            </div>
            <div class="no-data-tip" v-else>
                暂无数据...
            </div>
        </div>
    </div>
</template>
<script>
    import wx from "@/utils/wx"
    export default {
        data() {
            return {
                region: [],
                address: "",
                activeTab: "0",
                list: [{
                    "id": 22,
                    "category": "汤勺",
                    "model": "12",
                    "factory": "1243",
                    "title": "30",
                    "price": "123",
                    "startdate": "2018-07-25",
                    "enddate": "2018-08-28",
                    "stock": "期货",
                    "details": "额外发射点发射点",
                    "place": "北京市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180726\/a28b20cf7432193aacea6011c1ccf85a.png"],
                    "linkman": "王芬芬",
                    "phone": "15877346100",
                    "userid": 13,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 6,
                    "tax": 1,
                    "createtime": "2018-08-12 17:11:06"
                }, {
                    "id": 21,
                    "category": "锅铲",
                    "model": "GY-GC01",
                    "factory": "古域",
                    "title": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲",
                    "price": "15",
                    "startdate": "2018-07-24",
                    "enddate": "2018-08-31",
                    "stock": "现货",
                    "details": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲\n食品级 304不锈钢锅铲",
                    "place": "天津市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f96b139cbf06488d1008f4fb26b0c5e3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/c8a01cfd7a14102b3d0471b41dffe7ce.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7c74ee1d73cf9a3472880f79a9966a1d.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f9070cef3013cad3de8541452aad70e7.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/1007ec231aa840ef23eccfa7d33f4e5a.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/21709b62420dc7071ee041aff030a870.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457129",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 12,
                    "tax": 1,
                    "createtime": "2018-08-13 21:34:41"
                }, {
                    "id": 20,
                    "category": "炒锅",
                    "model": "华格仕 HGS-01",
                    "factory": "华格仕",
                    "title": "华格仕304不锈钢炒锅无油烟不粘锅多功能家用炒菜电磁炉燃气适用",
                    "price": "134",
                    "startdate": "2018-07-23",
                    "enddate": "2018-08-15",
                    "stock": "期货",
                    "details": "品牌名称：华格仕\n产品参数：\n\n产品名称：华格仕 HGS-01包装体积: 55cmX33cmX15cm毛重: 3.25kg流行元素: 纯色适用人群: 80后适用场景: 日常送礼颜色分类: 不锈钢色（带可立盖） 不锈钢色（带玻璃可立盖）风格: 中式品牌: 华格仕型号: HGS-01直径: 32cm适用对象: 燃气电磁灶通用特点: 少油烟、不易粘锅 无油烟 不粘 无涂层 不生锈材质: 304不锈钢产地: 中国大陆净重: 2.35kg深度: 9cm锅盖类型: 不锈钢镶玻璃立盖",
                    "place": "北京市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7fa997eb36595f1e211b6e3a9c3a95be.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2f6e00893d492ab58cf48c28f3714b72.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2d9707e639fc946d63b3098a869785b3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/83bf78e7b43b1ee9ae897f716ea5110e.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/dcfff9c4f39411174d10df98c55bd759.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457120",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 1,
                    "tax": 1,
                    "createtime": "2018-07-23 21:20:56"
                }, {
                    "id": 19,
                    "category": "锅铲",
                    "model": "GY-GC01",
                    "factory": "古域",
                    "title": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲",
                    "price": "15",
                    "startdate": "2018-07-24",
                    "enddate": "2018-08-31",
                    "stock": "现货",
                    "details": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲\n食品级 304不锈钢锅铲",
                    "place": "天津市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f96b139cbf06488d1008f4fb26b0c5e3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/c8a01cfd7a14102b3d0471b41dffe7ce.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7c74ee1d73cf9a3472880f79a9966a1d.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f9070cef3013cad3de8541452aad70e7.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/1007ec231aa840ef23eccfa7d33f4e5a.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/21709b62420dc7071ee041aff030a870.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457129",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 2,
                    "tax": 1,
                    "createtime": "2018-07-23 01:50:32"
                }, {
                    "id": 18,
                    "category": "炒锅",
                    "model": "华格仕 HGS-01",
                    "factory": "华格仕",
                    "title": "华格仕304不锈钢炒锅无油烟不粘锅多功能家用炒菜电磁炉燃气适用",
                    "price": "134",
                    "startdate": "2018-07-23",
                    "enddate": "2018-08-15",
                    "stock": "期货",
                    "details": "品牌名称：华格仕\n产品参数：\n\n产品名称：华格仕 HGS-01包装体积: 55cmX33cmX15cm毛重: 3.25kg流行元素: 纯色适用人群: 80后适用场景: 日常送礼颜色分类: 不锈钢色（带可立盖） 不锈钢色（带玻璃可立盖）风格: 中式品牌: 华格仕型号: HGS-01直径: 32cm适用对象: 燃气电磁灶通用特点: 少油烟、不易粘锅 无油烟 不粘 无涂层 不生锈材质: 304不锈钢产地: 中国大陆净重: 2.35kg深度: 9cm锅盖类型: 不锈钢镶玻璃立盖",
                    "place": "北京市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7fa997eb36595f1e211b6e3a9c3a95be.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2f6e00893d492ab58cf48c28f3714b72.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2d9707e639fc946d63b3098a869785b3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/83bf78e7b43b1ee9ae897f716ea5110e.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/dcfff9c4f39411174d10df98c55bd759.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457120",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 2,
                    "tax": 1,
                    "createtime": "2018-08-02 14:41:37"
                }, {
                    "id": 17,
                    "category": "锅铲",
                    "model": "GY-GC01",
                    "factory": "古域",
                    "title": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲",
                    "price": "15",
                    "startdate": "2018-07-24",
                    "enddate": "2018-08-31",
                    "stock": "现货",
                    "details": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲\n食品级 304不锈钢锅铲",
                    "place": "天津市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f96b139cbf06488d1008f4fb26b0c5e3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/c8a01cfd7a14102b3d0471b41dffe7ce.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7c74ee1d73cf9a3472880f79a9966a1d.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f9070cef3013cad3de8541452aad70e7.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/1007ec231aa840ef23eccfa7d33f4e5a.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/21709b62420dc7071ee041aff030a870.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457129",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 2,
                    "tax": 1,
                    "createtime": "2018-07-23 01:50:32"
                }, {
                    "id": 16,
                    "category": "炒锅",
                    "model": "华格仕 HGS-01",
                    "factory": "华格仕",
                    "title": "华格仕304不锈钢炒锅无油烟不粘锅多功能家用炒菜电磁炉燃气适用",
                    "price": "134",
                    "startdate": "2018-07-23",
                    "enddate": "2018-08-15",
                    "stock": "期货",
                    "details": "品牌名称：华格仕\n产品参数：\n\n产品名称：华格仕 HGS-01包装体积: 55cmX33cmX15cm毛重: 3.25kg流行元素: 纯色适用人群: 80后适用场景: 日常送礼颜色分类: 不锈钢色（带可立盖） 不锈钢色（带玻璃可立盖）风格: 中式品牌: 华格仕型号: HGS-01直径: 32cm适用对象: 燃气电磁灶通用特点: 少油烟、不易粘锅 无油烟 不粘 无涂层 不生锈材质: 304不锈钢产地: 中国大陆净重: 2.35kg深度: 9cm锅盖类型: 不锈钢镶玻璃立盖",
                    "place": "北京市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7fa997eb36595f1e211b6e3a9c3a95be.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2f6e00893d492ab58cf48c28f3714b72.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/2d9707e639fc946d63b3098a869785b3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/83bf78e7b43b1ee9ae897f716ea5110e.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/dcfff9c4f39411174d10df98c55bd759.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457120",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 3,
                    "tax": 1,
                    "createtime": "2018-07-26 21:26:51"
                }, {
                    "id": 15,
                    "category": "锅铲",
                    "model": "GY-GC01",
                    "factory": "古域",
                    "title": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲",
                    "price": "15",
                    "startdate": "2018-07-24",
                    "enddate": "2018-08-31",
                    "stock": "现货",
                    "details": "德国304不锈钢锅铲汤勺防烫厨具一体长柄炒菜铲子加厚炒勺铁菜铲\n食品级 304不锈钢锅铲",
                    "place": "天津市",
                    "images": ["http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f96b139cbf06488d1008f4fb26b0c5e3.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/c8a01cfd7a14102b3d0471b41dffe7ce.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/7c74ee1d73cf9a3472880f79a9966a1d.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/f9070cef3013cad3de8541452aad70e7.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/1007ec231aa840ef23eccfa7d33f4e5a.jpg", "http:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180723\/21709b62420dc7071ee041aff030a870.jpg"],
                    "linkman": "高旭",
                    "phone": "18789457129",
                    "userid": 10,
                    "enable": 1,
                    "status": 1,
                    "checked": "已同意",
                    "view": 2,
                    "tax": 1,
                    "createtime": "2018-07-23 01:50:32"
                }]
            }
        },
        created() {
       
        },
        methods: {
            changeActiveTab(active) {
                this.activeTab = active
            },
            bindRegionChange(e) {
                var value = e.mp.detail.value
                console.log(value)
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
