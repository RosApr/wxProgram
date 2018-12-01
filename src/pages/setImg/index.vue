<template>
    <div class="container">
        <exec-tip :showTip="showTip" :tip="tip" />
        <div class="item">
            <div class="grid label"><span class="badge">*</span>上传图片：</div>
            <div class="grid input">
                <div class="img-container"
                    v-for="(item, index) in tempImgs"
                    :key="index"
                    @click="delImg(index)"
                    >
                    <img :src="item" alt="">
                    <div class="del" @click="delImg">X</div>
                </div>
                <div class="upload-img-btn" @click="uploadImg">+</div>
            </div>
        </div>
        <button class="weui-btn" @click="modify" type="primary">确认</button>
    </div>
</template>
<script>
import WXP from 'minapp-api-promise'
import execTip from "@/components/execTip"
import { uploadImgUrl, modifyUserProfile } from "@/utils/api"
import { INDEX_PAGE_LIST_TYPE, setWxNavBarTitle, TOKEN, USER_PROFILE,
    modifyUserProfileSuccessCallback } from "@/utils/common"
import { mapActions, mapState, mapMutations } from "vuex"
export default {
    data() {
        return {
            tip: "",
            showTip: false,
            tempImgs: [],
            uploadUrl: uploadImgUrl,
            modifyUserProfileApi: modifyUserProfile,
            cb: modifyUserProfileSuccessCallback
        }
    },
    mounted() {
        setWxNavBarTitle("修改营业执照")
        this.tempImgs = wx.getStorageSync(USER_PROFILE).images || []
        if(this.tempImgs.length > 0) {
            Promise.all(this.tempImgs.map(imgUrl => {
                return WXP.getImageInfo({
                    src: imgUrl
                })
            })).then(async res => {
                this.tempImgs = res.map(({ path }) => path)
            })
        }
    },
    methods: {
        uploadImg() {
            const that = this
            wx.chooseImage({
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let _imgArray = []
                    res.tempFiles.forEach((item, index) => {
                        if(item.size / 1024 / 1024 < 1) {
                            _imgArray.push(res.tempFilePaths[index])
                        } else {
                            that.showTip = true
                            that.tip = "图片过大，图片小于1M"
                            setTimeout(() => {
                                that.showTip = false
                            }, 2000)
                        }
                    })
                    that.tempImgs = that.tempImgs.concat(_imgArray)
                },
                fail: function () {
                    // console.log('fail');
                },
                complete: function () {
                    // console.log('commplete');
                }
            })
        },
        delImg(index) {
            this.tempImgs.splice(index, 1)
        },
        modify() {
            // publish
            const that = this
            const queue = this.tempImgs.map(item => {
                return WXP.uploadFile({
                    url: that.uploadUrl,
                    filePath: item,
                    name: 'file',
                    formData: {
                        token: wx.getStorageSync(TOKEN)
                    }
                    
                })
            })
            Promise.all(queue).then(async res => {
                const formData = {}
                formData["images"] = res.map(item => {
                    return JSON.parse(item["data"])["data"]["url"]
                })
                // publish
                const modifyRes = await this.modifyUserProfileApi(formData)
                this.cb(modifyRes)
            })
        }
    },
    components: {
        execTip
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
                        margin-bottom: 40rpx;
                        position: relative;
                        box-sizing: border-box;
                        img {
                            width: 100%;
                            display: block;
                            margin: 0 auto;
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

