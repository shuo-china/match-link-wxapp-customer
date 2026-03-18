<template>
    <view v-if="modelValue" class="connect-popup">
        <view class="mask" @tap="closePopup"></view>
        <view class="content">
            <view class="body">
                <view class="avatar-container">
                    <image src="/static/logo.png" mode="aspectFill" class="avatar-img" />
                </view>
                <view class="info-content">
                    <text class="name">{{ name }}</text>
                    <text class="desc">专业红娘为您服务，期待您的来电</text>
                </view>
            </view>
            <view class="footer">
                <button class="call-btn" hover-class="btn-hover" @tap="makePhoneCall">
                    <uni-icons type="phone" size="20" color="#fff" style="margin-right: 10rpx;"></uni-icons>
                    立即拨打
                </button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: '红娘：王姐'
    },
    phone: {
        type: String,
        default: '13337935576'
    }
});

const emit = defineEmits(['update:modelValue']);

const closePopup = () => {
    emit('update:modelValue', false);
};

const makePhoneCall = () => {
    uni.makePhoneCall({
        phoneNumber: props.phone
    });
};
</script>

<style scoped lang="scss">
.connect-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .content {
        position: relative;
        width: 600rpx;
        background-color: #ffffff;
        border-radius: 20rpx;
        overflow: hidden;
        z-index: 1000;

        .body {
            padding: 40rpx 40rpx 20rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

            .avatar-container {
                width: 200rpx;
                height: 200rpx;
                margin-bottom: 20rpx;

                .avatar-img {
                    width: 100%;
                    height: 100%;
                }
            }

            .info-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;

                .name {
                    font-size: 36rpx;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 16rpx;
                }

                .desc {
                    font-size: 24rpx;
                    color: #999;
                    text-align: center;
                }
            }
        }

        .footer {
            padding: 20rpx 40rpx 50rpx;

            .call-btn {
                width: 100%;
                height: 88rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #ff9a9e 0%, #ff758c 100%);
                color: #ffffff;
                font-size: 32rpx;
                font-weight: 500;
                border-radius: 44rpx;
                border: none;
                box-shadow: 0 8rpx 20rpx rgba(255, 117, 140, 0.3);
                transition: all 0.2s;

                &::after {
                    border: none;
                }

                &.btn-hover {
                    transform: scale(0.98);
                    opacity: 0.9;
                }
            }
        }
    }
}
</style>