<template>
    <div class="container">
        <div class="tip" :class="{'active': showTip}">{{tip}}</div>
        <div class="title">基础信息</div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>发布标题：</div>
            <div class="grid input">
                <input class="height border" placeholder="请输入标题" type="text" v-model.lazy="title">
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>价格：</div>
            <div class="grid input">
                <input class="height border" placeholder="请输入价格" type="text" v-model.lazy="price">
            </div>
        </div>
        <div class="item"> 
            <div class="grid label"><span class="badge">*</span>有效期：</div>
            <div class="grid input">
                <div class="date-container">
                    <picker class="date-picker date-grid" :start="startdateConfig" mode="date" @change="startdateChange" :value="startdate">
                        <div class="border height arrow">{{startdate || "请选择"}}</div>
                    </picker>
                    <span class="date-grid text">
                        至
                    </span>
                    <picker class="date-picker date-grid" :start="enddateConfig" mode="date" @change="enddateChange" :value="enddate">
                        <div class="border height arrow">{{enddate || "请选择"}}</div>
                    </picker>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>产品分类：</div>
            <div class="grid input">
                <picker mode="selector" @change="categoryChange" :value="categoryIndex" :range="filters['category']">
                    <div class="border height arrow">{{category || "请选择产品分类"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>产品型号：</div>
            <div class="grid input">
                <picker mode="selector" @change="modelChange" :value="modelIndex" :range="filters['model']">
                    <div class="border height arrow">{{model || "请选择产品型号"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>厂家：</div>
            <div class="grid input">
                <picker mode="selector" @change="factoryChange" :value="factoryIndex" :range="filters['factory']">
                    <div class="border height arrow">{{factory || "请选择厂家"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>库存：</div>
            <div class="grid input">
                <picker mode="selector" @change="stockChange" :value="stockIndex" :range="filters['stock']">
                    <div class="border height arrow">{{stock || "请选择库存"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>产地：</div>
            <div class="grid input">
                <picker mode="multiSelector" @change="regionChange" @columnchange="regionColumnChange" :value="regionIndex" :range="regionDataComputed">
                    <div class="border height arrow">{{place || "请选择出发城市"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>上传图片：</div>
            <div class="grid input">
                <div class="img-container"
                    v-for="(item, index) in tempImgs"
                    :key="index"
                    @click="delImg(index)"
                    >
                    <div class="img" :style="{backgroundImage: 'url(' + item + ')'}"></div>
                    <div class="del">X</div>
                </div>
                <div class="upload-img-btn" @click="uploadImg">+</div>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>详细信息：</div>
            <div class="grid input">
                <textarea class="border" v-model.lazy="details" rows="6"></textarea>
            </div>
        </div>
        <div class="title">联系方式</div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>联系人：</div>
            <div class="grid input">
                <input class="height border" placeholder="请输入联系人名称" type="text" v-model.lazy="linkman">
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>联系电话：</div>
            <div class="grid input">
                <input class="height border" placeholder="请输入联系电话" type="text" v-model.lazy="phone">
            </div>
        </div>
        <button class="weui-btn" @click="publish" type="primary">确认</button>
    </div>
</template>
<script>
import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle, TOKEN, EXEC_REGULAR } from "@/utils/common"
import { publishApi, uploadImgUrl } from "@/utils/api"
import regionArray from "@/utils/region"
import WXP from 'minapp-api-promise'
import { mapActions, mapState, mapMutations } from "vuex"
const tipConfig = {
    title: "请输入标题！",
    price: "请输入价格！",
    linkman: "请输入联系人名称！",
    startdate: "请选择开始时间！",
    enddate: "请选择结束时间！",
    details: "请输入详细信息！",
    phone: "请输入联系电话！",
    stock: "请选择承载信息！",
    model: "请选择产品型号",
    category: "请选择产品分类",
    factory: "请选择厂家",
    stock: "请选择库存类型！",
    place: "请选择产地！",
}
export default {
    data() {
        return {
            filters: {},
            title: "",
            price: "",
            phone: "",
            linkman: "",
            startdate: this.$moment().format("YYYY-MM-DD"),
            enddate: this.$moment().format("YYYY-MM-DD"),
            details: "",
            regionData: regionArray,
            // 产地
            regionIndex: [0,0],
            regionSecond: 0,

            place: "",
            // 库存信息
            stockIndex: 0,
            stock: "",
            // 产品分类信息
            categoryIndex: 0,
            category: "",
            // 产品型号信息
            modelIndex: 0,
            model: "",
            // 厂家信息
            factoryIndex: 0,
            factory: "",
            // 时间选择纠正 结束时间大于等于开始时间
            startdateConfig: "",
            enddateConfig: "",
            tip: "",
            showTip: false,
            tipConfig: tipConfig,
            tempImgs: [],
            type: "",
            publishApi: publishApi,
            uploadUrl: uploadImgUrl,
            token: TOKEN,
            publishType: ""
        }
    },
    mounted() {
        this.filters = Object.assign(this.$store.state.filters)
        setWxNavBarTitle("发布")
        const { query: { type }} = this.$root.$mp
        this.publishType = type
        //配置时间选择插件起始时间
        this.startdateConfig = this.$moment().format("YYYY-MM-DD")
        this.enddateConfig = this.$moment().format("YYYY-MM-DD")
    },
    computed: {
        regionDataComputed() {
            const secondColumn = this.regionData[1][this.regionSecond]
            return [this.regionData[0], secondColumn]
        }
    },
    methods: {
        regionChange(e) {
            const values = e.mp.detail.value
            this.place = this.regionData[1][values[0]][values[1]]
        },
        regionColumnChange(e) {
            if(e.mp.detail.column === 0) {
                this.regionSecond = e.mp.detail.value
                this.regionIndex = [e.mp.detail.value, 0]
            }
        },
        modelChange(e) {
            this.modelIndex = e.mp.detail.value
            this.model = this.filters['model'][e.mp.detail.value]
        },
        factoryChange(e) {
            this.factoryIndex = e.mp.detail.value
            this.factory = this.filters['factory'][e.mp.detail.value]
        },
        categoryChange(e) {
            this.categoryIndex = e.mp.detail.value
            this.category = this.filters['category'][e.mp.detail.value]
        },
        stockChange(e) {
            this.stockIndex = e.mp.detail.value
            this.stock = this.filters['stock'][e.mp.detail.value]
        },
        startdateChange(e) {
            this.startdate = e.mp.detail.value
            this.enddate = this.startdate
            this.enddateConfig = this.startdate
        },
        enddateChange(e) {
            this.enddate = e.mp.detail.value
        },
        uploadImg() {
            const that = this
            wx.chooseImage({
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    that.tempImgs = that.tempImgs.concat(res.tempFilePaths)
                },
                fail: function () {
                    console.log('fail');
                },
                complete: function () {
                    console.log('commplete');
                }
            })
        },
        delImg(index) {
            this.tempImgs.splice(index, 1)
        },
        publish() {
            if(this.showTip) {
                return false;
            }
            for(let [key,value] of Object.entries(this.tipConfig)) {
                if(this[key] == '') {
                    this.showTip = true
                    this.tip = value
                    return setTimeout(() => {
                        this.showTip = false
                    }, 2000)
                }
            }
            if(!EXEC_REGULAR.phone.test(this.phone)) {
                this.tip = "手机号格式不正确!"
                this.showTip = true
                return setTimeout(() => {
                    this.showTip = false
                }, 2000)
            }
            if(this.tempImgs.length === 0) {
                this.showTip = true
                this.tip = "请上传至少一张图片！"
                return setTimeout(() => {
                    this.showTip = false
                }, 2000)
            }
            const that = this
            const queue = this.tempImgs.map(item => {
                return WXP.uploadFile({
                    url: that.uploadUrl,
                    filePath: item,
                    name: 'file',
                    formData: {
                        token: that.token
                    }
                    
                })
            })
            Promise.all(queue).then(async res => {
                const data = {}
                // make form data
                for(let [key,value] of Object.entries(this.tipConfig)) {
                    data[key] = this[key]
                }
                data["publishType"] = this.publishType
                // publish
                // make form data
                data["images"] = res.map(item => {
                    return JSON.parse(item["data"])["data"]["url"]
                })
                // publish
                const publishRes = await this.publishApi(data)
                if(publishRes.code == 1) {
                    wx.switchTab({
                        url: '/pages/publish/main'
                    })
                }
            })
            
        }
    }
}
</script>
<style lang="less" scoped>
    .container {
        position: relative;
        .tip {
            z-index: 9;
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            position: fixed;
            top: -80rpx;
            font-size: 32rpx;
            color: #fff;
            background: red;
            transform: all .3s ease;
            opacity: 0;
            &.active {
                top: 0;
                opacity: 1;
            }
        }
        padding: 30rpx 30rpx 40rpx;
        .title {
            font-size: 28rpx;
            color: #383838;
            margin-bottom: 20rpx;
            width: 100%;
            z-index: 2;
        }
        .item {
            z-index: 2;
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20rpx;
            margin-top: 10rpx;
            .grid {
                &.input {
                    flex: 1;
                    color: #8c8c8c;
                    font-size: 28rpx;
                    min-height: 48rpx;
                    .upload-img-btn {
                        display: inline-block;
                        width: 150rpx;
                        height: 150rpx;
                        line-height: 150rpx;
                        border-radius: 16rpx;
                        font-size: 50rpx;
                        color: #dadada;
                        text-align: center;
                        border: 1rpx solid #dadada;
                    }
                    .img-container {
                        border-radius: 16rpx;
                        padding: 20rpx;
                        border: 1rpx solid #dadada;
                        width: 100%;
                        height: 300rpx;
                        margin-bottom: 40rpx;
                        position: relative;
                        box-sizing: border-box;
                        .img {
                            background-size: contain;
                            background-position: center;
                            background-repeat: no-repeat;
                            width: 100%;
                            height: 100%;
                        }
                        .del {
                            position: absolute;
                            top: -15rpx;
                            right: -15rpx;
                            width: 40rpx;
                            height: 40rpx;
                            line-height: 40rpx;
                            border-radius: 100rpx;
                            background: red;
                            color: #fff;
                            text-align: center;
                            font-size: 24rpx;
                        }
                    }
                    .height {
                        height: 50rpx;
                        line-height: 50rpx;
                    }
                    textarea {
                        line-height: 30rpx;
                        width: 100%;
                        padding-right: 30rpx;
                        padding-top: 20rpx;
                        box-sizing: border-box;
                    }
                    .border {
                        position: relative;
                        padding-left: 20rpx;
                        border: 1rpx solid #dadada;
                        border-radius: 8rpx;
                    }
                    .arrow {
                        &:after {
                            content: "<";
                            position: absolute;
                            top: 50%;
                            right: 20rpx;
                            transform: translateY(-50%) rotateZ(-90deg);
                            font-size: 26rpx;
                            color: #8c8c8c;
                        }
                    }
                    .date-container {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .date-grid.text {
                            padding: 0 20rpx;
                        }
                        .date-picker {
                            flex: 1;
                        }
                    }
                }
                &.label {
                    width: 160rpx;
                    text-align: right;
                    .badge {
                        color: #e03539;
                        font-size: 30rpx;
                    }
                    color: #8c8c8c;
                    font-size: 28rpx;
                }
            }
        }
        .weui-btn {
            width: 100%;
            border-radius: 200rpx;
        }
    }
</style>

