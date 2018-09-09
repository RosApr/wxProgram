<template>
    <div class="search-container">
        <div class="search-bar">
            <div class="grid input">
                <input placeholder-style='color:#fff;' v-model.lazy="search" type="text" placeholder="搜索">
            </div>
            <div class="grid label" @click="searchList">
                <div class="search-btn">搜索</div>
            </div>
        </div>
        <div class="list" v-if="searchConfig.list.length > 0">
            <div class="item"
                v-for="(item, index) in searchConfig.list"
                :key="index">
                <div class="type">
                    <span>{{item.typeFormat}}</span>
                </div>
                <div class="info">
                    <p class="title">{{(item.title)}}</p>
                    <p class="nickname">发布人: <span class="name">{{(item.nickname)}}</span></p>
                    <p class="date">有效期：{{item.startdate}}-{{item.enddate}}</p>
                    <p class="date">浏览次数：{{item.view}}</p>
                </div>
                <div class="btn" @click="showDetail(item.id, item.type)">查看</div>
            </div>
        </div>
        <div class="no-list-tip" v-else>暂无数据</div>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from "vuex"
    import { setWxNavBarTitle } from "@/utils/common"
    export default {
        data() {
            return {
                search: "",
                size: 8,
                page: 1,
                list: []
            }
        },
        computed: {
            ...mapState([
                "searchConfig"
            ])
        },
        mounted() {
            setWxNavBarTitle("搜索")
        },
        onReachBottom() {
            this.querySearchList()
        },
        methods: {
            ...mapMutations([
                "saveSearchData"
            ]),
            ...mapActions([
                "querySearchList"
            ]),
            searchList() {
                if(this.search == "") {
                    return false
                } else {
                    this.querySearchList({
                        search: this.search
                    })
                }
            },
            showDetail(id, listType) {
                wx.navigateTo({
                    url: `/pages/detail/main?type=${listType}&id=${id}`
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .search-container {
        height: 100%;
        background: #fff;
        box-sizing: border-box;
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
                    width: 120rpx;
                    .search-btn {
                        display: inline-block;
                        margin-top: 30rpx;
                        padding: 4rpx 16rpx;
                        color: #36ca45;
                        border-radius: 12rpx;
                        font-size: 28rpx;
                        background: #fff;
                        height: 60rpx;
                        line-height: 60rpx;
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
        .list {
            padding: 40rpx 30rpx 10rpx;
        }
        .item {
            &:last-child {
                border: 0;
            }
            width: 100%;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1rpx solid #a7a7a7;
            margin-bottom: 20rpx;
            padding-bottom: 10rpx;
            .type {
                width: 100rpx;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                align-self: flex-start;
                color: #65ba4a;
                font-size: 30rpx;
            }
            .info {
                flex: 1;
                .title {
                    color: #383838;
                    font-size: 28rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 10rpx;
                }
                .date {
                    color: #a7a7a7;
                    font-size: 28rpx;
                }
                .nickname {
                    color: #a7a7a7;
                    font-size: 28rpx;
                    .name {
                        color: #65ba4a;
                    }
                }
            }
            .btn {
                width: 100rpx;
                height: 100%;
                color: #65ba4a;
                font-size: 30rpx;
                text-align: right;
            }
        }
        .no-list-tip {
            text-align: center;
            color: #ccc;
            font-size: 30rpx;
            padding: 200rpx 0;
        }
    }
</style>

