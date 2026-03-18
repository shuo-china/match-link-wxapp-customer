<template>
    <view class="detail-container">
        <mbr-detail :data="data" />
        <connect-popup v-model="connectPopupVisible" />

        <view class="contact-btn" @tap="connectPopupVisible = true">
            <uni-icons type="heart-filled" size="22" color="#fff"></uni-icons>
            <text class="btn-text">红娘牵线</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getMbrDetailApi } from '@/api/mbr'
import { ref } from 'vue';

const connectPopupVisible = ref(false)

const data = ref(null)

onLoad((options) => {
    getMbrDetailApi({
        uid: options?.uid,
    }).then(res => {
        data.value = res
    })
})
</script>

<style lang="scss" scoped>
.detail-container {
    position: relative;
    min-height: 100vh;
}

.contact-btn {
    position: fixed;
    bottom: 100rpx;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
    padding: 20rpx 40rpx;
    border-radius: 100rpx;
    box-shadow: 0 10rpx 30rpx rgba(255, 117, 140, 0.5);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    animation: pulse 2s infinite;

    .btn-text {
        color: #fff;
        font-size: 34rpx;
        font-weight: 600;
        margin-left: 12rpx;
        letter-spacing: 1px;
        line-height: 1;
    }

    &:active {
        transform: translateX(-50%) scale(0.95);
        opacity: 0.9;
        box-shadow: 0 4rpx 12rpx rgba(255, 117, 140, 0.4);
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 117, 140, 0.4);
    }

    70% {
        box-shadow: 0 0 0 20rpx rgba(255, 117, 140, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 117, 140, 0);
    }
}
</style>