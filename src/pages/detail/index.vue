<template>
    <div class="detail-container">
        <div class="log-container" v-if="type == typeConfig['logistics']">
            <div class="weui-form-preview__bd">
                <div class="title">{{detail.title}}</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__value">{{detail.details}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">有效期：</div>
                    <div class="weui-form-preview__value">{{detail.startdate}}-{{detail.enddate}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">发布人：</div>
                    <div class="weui-form-preview__value"><span class="person">{{detail.nickname}}</span></div>
                </div>
                <div class="img-container" v-if="detail.images && detail.images.length > 0">
                    <img :src="url" v-for="(url, index) in detail.images" :key="index" alt="">
                </div>
                <div class="price-container weui-form-preview__item">
                    <span class="symbol">¥</span>
                    <span class="price">{{detail.price}}</span>
                </div>
                <div class="title">物流基本信息</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">出发城市：</div>
                    <div class="weui-form-preview__value">{{detail.rmation}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">到达城市：</div>
                    <div class="weui-form-preview__value">{{detail.destination}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">出发时间：</div>
                    <div class="weui-form-preview__value">{{detail.startdate}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">承载信息：</div>
                    <div class="weui-form-preview__value">{{detail.type}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">车辆信息：</div>
                    <div class="weui-form-preview__value">{{detail.vehicletype}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">备注：</div>
                    <div class="weui-form-preview__value">{{detail.remark}}</div>
                </div>
                <div class="title">联系信息</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">联系人：</div>
                    <div class="weui-form-preview__value">{{detail.linkman}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">联系电话：</div>
                    <div class="weui-form-preview__value">{{detail.phone}}</div>
                </div>
            </div>
        </div>
        <div class="log-container" v-else>
            <div class="weui-form-preview__bd">
                <div class="title">{{detail.title}}</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">有效期：</div>
                    <div class="weui-form-preview__value">{{detail.startdate}}-{{detail.enddate}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">发布人：</div>
                    <div class="weui-form-preview__value"><span class="person">{{detail.nickname}}</span></div>
                </div>
                <div class="img-container" v-if="detail.images && detail.images.length > 0">
                    <img :src="url" v-for="(url, index) in detail.images" :key="index" alt="">
                </div>
                <div class="price-container weui-form-preview__item">
                    <span class="symbol">¥</span>
                    <span class="price">{{detail.price}}</span>
                </div>
                <div class="title">宝贝基本信息</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">产品分类：</div>
                    <div class="weui-form-preview__value">{{detail.category}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">产品型号：</div>
                    <div class="weui-form-preview__value">{{detail.model}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">产地：</div>
                    <div class="weui-form-preview__value">{{detail.place}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">库存：</div>
                    <div class="weui-form-preview__value">{{detail.stock}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">厂家：</div>
                    <div class="weui-form-preview__value">{{detail.factory}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">详细描述：</div>
                    <div class="weui-form-preview__value">{{detail.details}}</div>
                </div>
                <div class="title">联系信息</div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">联系人：</div>
                    <div class="weui-form-preview__value">{{detail.linkman}}</div>
                </div>
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">联系电话：</div>
                    <div class="weui-form-preview__value">{{detail.phone}}</div>
                </div>
            </div>
        </div>
        <div class="btn-container" v-if="!isOwnPublish">
            <button class="weui-btn" @click="showModel" type="primary">举报</button>
        </div>
        <div class="report-container" :class="{ 'active': showReportModel}">
            <div class="content">
                <radio-group @change="radioChange">
                    <label class="weui-cell weui-check__label" v-for="(item, index) in radioItems" :key="index">
                        <radio class="weui-check" :value="item.value" :checked="item.checked" />
                        <div class="weui-cell__bd">{{item.name}}</div>
                        <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
                        <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
                        </div>
                    </label>
                </radio-group>
                <textarea v-model="reportInfo" cols="30" rows="10"></textarea>
                <div class="item">
                    <div class="grid"><div class="btn ok" @click="report">确定</div></div>
                    <div class="grid"><div class="btn cancel" @click="cancel">取消</div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle, openAjaxModel } from "@/utils/common"
    import { reportPublish } from "@/utils/api"
    import { mapActions, mapState } from "vuex"
    export default {
        data() {
            return {
                type: "",
                id: "",
                reportInfo: "",
                typeConfig: INDEX_PAGE_LIST_TYPE,
                isOwnPublish: "",
                radioItems: [
                    { name: '此信息涉及欺骗', value: '此信息涉及欺骗', checked: true },
                    { name: '信息不真实', value: '信息不真实' }
                ],
                showReportModel: false,
                reportPublish: reportPublish
            }
        },
        mounted() {
            setWxNavBarTitle("详情")
            const { query: { id, type, isOwnPublish }} = this.$root.$mp
            // 从我的发布过来，不能举报
            this.isOwnPublish = isOwnPublish
            this.type = type
            this.id = id
            if(!id || !type) {
                wx.navigateTo({
                    url: "/pages/index/main"
                })
            }
            this.getDetail(this.$root.$mp.query)
        },
        computed: {
            ...mapState([
                "detail"
            ])
        },
        methods: {
            ...mapActions([
                "getDetail"
            ]),
            radioChange(e) {
                let radioItems = this.radioItems;
                for (let i = 0; i < radioItems.length; ++i) {
                    radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
                }
                this.radioItems = radioItems;
            },
            async report() {
                // 举报
                const data = {
                    type: this.type,
                    infoid: this.id,
                    info: this.reportInfo == "" ? this.radioItems.filter(item => item["checked"])[0]["value"] : this.reportInfo
                }
                const res = await this.reportPublish(data)
                openAjaxModel({code :res.code, title: "举报成功"}, this.cancel)
            },
            showModel() {
                this.reportInfo = ""
                this.showReportModel = true
            },
            cancel() {
                this.showReportModel = false
            }
        }
    }
</script>
<style lang="less" scoped>
    .detail-container {
        .btn-container {
            width: 190rpx;
            margin: 40rpx auto;
        }
        .log-container {
            .title {
                color: #383838;
                text-align: left;
            }
            .person {
                color: #54cb60;
            }
            .price-container {
                color: #e67a22;
                text-align: left;
                .symbol {
                    font-size: 32rpx;
                    vertical-align: top;
                }
                .price {
                    font-size: 58rpx;
                }
            }
            .img-container {
                img {
                    display: block;
                    margin-bottom: 20rpx;
                }
            }
            .weui-form-preview__item {
                margin-bottom: 10rpx;
            }
            .weui-form-preview__label {
                margin-right: 0;
                font-size: 28rpx;
                color: #8c8c8c;
                min-width: 140rpx;
                text-align: right;
            }
            .weui-form-preview__value {
                text-align: left;
                color: #8c8c8c;
            }
        }
    }
    .report-container {
        &.active {
            display: block;
        }
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.7);
        .content {
            padding: 20rpx 30rpx 80rpx;
            background: #fff;
            border-radius: 10rpx;
            width: 80%;
            margin: 300rpx auto 0;
            .weui-cell__bd {
                color: #8c8c8c;
                font-size: 28rpx;
            }
            textarea {
                box-sizing: border-box;
                margin-top: 30rpx;
                padding: 8rpx 10rpx;
                width: 100%;
                color: #8c8c8c;
                font-size: 28rpx;
                border-radius: 8rpx;
                border: 1rpx solid #a7a7a7;
            }
            .item {
                display: flex;
                justify-items: space-around;
                align-content: center;
                height: 40rpx;
                line-height: 40rpx;
                margin-top: 40rpx;
                .grid {
                    text-align: center;
                    flex: 1;
                    .btn {
                        display: inline-block;
                        font-size: 28rpx;
                        padding: 14rpx 40rpx;
                        border-radius: 10rpx;
                        &.ok {
                            background: #54cb60;
                            color: #fff;
                        }
                        &.cancel {
                            background: #a7a7a7;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>