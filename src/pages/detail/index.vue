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
            <button class="weui-btn" @click="report" type="primary">举报</button>
        </div>
    </div>
</template>
<script>
    import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle } from "@/utils/common"
    import { reportPublish } from "@/utils/api"
    import { mapActions, mapState } from "vuex"
    export default {
        data() {
            return {
                type: "",
                typeConfig: INDEX_PAGE_LIST_TYPE,
                is: ""
            }
        },
        mounted() {
            setWxNavBarTitle("详情")
            const { query: { id, type, isOwnPublish }} = this.$root.$mp
            // 从我的发布过来，不能举报
            this.isOwnPublish = isOwnPublish
            this.type = type
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
            // 举报
            report() {
                const { query: { id, type }} = this.$root.$mp
                console.log(id)
                console.log(type)
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
</style>