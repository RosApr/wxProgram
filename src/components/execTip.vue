<template>
    <div class="tip" :class="{'active': showTip}">{{tip}}</div>
</template>
<script>
    export default {
        props: {
            tip: {
                type: String,
                default: ""
            },
            showTip: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="less" scoped>
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
</style>

