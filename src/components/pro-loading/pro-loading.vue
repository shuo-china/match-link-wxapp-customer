<template>
    <view class="loading-container">
        <view class="loading-content">
            <uni-icons type="spinner-cycle" size="30" color="#999" class="loading-icon"></uni-icons>
            <text class="loading-text">{{ text }}</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "pro-loading",
    props: {
        text: {
            type: String,
            default: '加载中...'
        }
    },
    data() {
        return {

        };
    }
}
</script>

<style scoped lang="scss">
.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-icon {
    animation: rotate 3s linear infinite;
    display: block;
}

.loading-text {
    color: #999;
    font-size: 28rpx;
    margin-top: 20rpx;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>