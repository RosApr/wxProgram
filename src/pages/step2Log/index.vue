<template>
    <div class="container">
        <div class="title">基础信息</div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>发布标题：</div>
            <div class="grid input">
                <input placeholder="请输入标题" type="text" v-model="title">
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>出发城市：</div>
            <div class="grid input">
                <picker mode="multiSelector" @change="regionChange" @columnchange="regionColumnChange" :value="regionIndex" :range="regionDataComputed">
                    <div>{{rmation || "请选择出发城市"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>到达城市：</div>
            <div class="grid input">
                <picker mode="multiSelector" @change="desRegionChange" @columnchange="desRegionColumnChange" :value="desRegionIndex" :range="desRegionDataComputed">
                    <div>{{destination || "请选择目的地"}}</div>
                </picker>
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>到达城市：</div>
            <div class="grid input">
                <input placeholder="请输入标题" type="text" v-model="title">
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>价格：</div>
            <div class="grid input">
                <input placeholder="请输入价格" type="text" v-model="price">
            </div>
        </div>
        <div class="title">联系方式</div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>联系人：</div>
            <div class="grid input">
                <input placeholder="请输入联系人名称" type="text" v-model="linkman">
            </div>
        </div>
        <div class="item">
            <div class="grid label"><span class="badge">*</span>联系电话：</div>
            <div class="grid input">
                <input placeholder="请输入联系电话" type="text" v-model="phone">
            </div>
        </div>
    </div>
</template>
<script>
import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
import { setWxNavBarTitle } from "@/utils/common"
import regionArray from "@/utils/region"
import { mapActions, mapState, mapMutations } from "vuex"
export default {
    data() {
        return {
            filters: {},
            title: "",
            price: "",
            phone: "",
            linkman: "",
            regionData: regionArray,
            // 出发
            regionIndex: [0,0],
            regionSecond: 0,
            // 到达
            desRegionIndex: [0,0],
            desRegionSecond: 0,

            rmation: "",
            destination: ""
        }
    },
    mounted() {
        this.filters = Object.assign(this.$store.state.filters)
        setWxNavBarTitle("发布")
        const { query: { type }} = this.$root.$mp
    },
    computed: {
        regionDataComputed() {
            const secondColumn = this.regionData[1][this.regionSecond]
            return [this.regionData[0], secondColumn]
        },
        desRegionDataComputed() {
            const secondColumn = this.regionData[1][this.desRegionSecond]
            return [this.regionData[0], secondColumn]
        }
    },
    methods: {
        regionChange(e) {
            const values = e.mp.detail.value
            this.rmation = this.regionData[1][values[0]][values[1]]
        },
        regionColumnChange(e) {
            if(e.mp.detail.column === 0) {
                this.regionSecond = e.mp.detail.value
                this.regionIndex = [e.mp.detail.value, 0]
            }
        },
        desRegionChange(e) {
            const values = e.mp.detail.value
            this.destination = this.regionData[1][values[0]][values[1]]
        },
        desRegionColumnChange(e) {
            if(e.mp.detail.column === 0) {
                this.desRegionSecond = e.mp.detail.value
                this.desRegionIndex = [e.mp.detail.value, 0]
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .container {
        padding: 0 30rpx;
        .title {
            font-size: 28rpx;
            color: #383838;
            margin-bottom: 10rpx;
            width: 100%;
        }
        .item {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;
            .grid {
                &.input {
                    flex: 1;
                    color: #a7a7a7;
                    font-size: 28rpx;
                    min-height: 48rpx;
                }
                &.label {
                    width: 160rpx;
                    .badge {
                        color: #e03539;
                        font-size: 30rpx;
                    }
                    color: #8c8c8c;
                    font-size: 28rpx;
                }
            }
        }
    }
</style>

