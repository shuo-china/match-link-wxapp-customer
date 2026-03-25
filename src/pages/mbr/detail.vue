<template>
    <view class="detail-container">
        <mbr-detail :data="data" />
        <connect-popup v-model="connectPopupVisible" />

        <view class="action-bar">
            <view class="action-btn like-btn" :class="{ 'is-active': data?.is_favorite }" @tap="handleLike">
                <uni-icons :type="data?.is_favorite ? 'heart-filled' : 'heart'" size="22"
                    :color="data?.is_favorite ? '#ff4d6d' : '#333'"></uni-icons>
                <text class="btn-text">{{ data?.is_favorite ? '已喜欢' : '喜欢' }}</text>
            </view>
            <view class="action-btn contact-btn" @tap="connectPopupVisible = true">
                <uni-icons type="phone-filled" size="22" color="#fff"></uni-icons>
                <text class="btn-text">红娘牵线</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getMbrDetailApi } from '@/api/mbr'
import { likeApi, dislikeApi } from '@/api/favorite'
import { ref } from 'vue';

const connectPopupVisible = ref(false)

const data = ref<any>(null)

const handleLike = async () => {
    if (!data.value) return;
    try {
        if (data.value.is_favorite) {
            await dislikeApi({ member_id: data.value.id });
            data.value.is_favorite = false;
        } else {
            await likeApi({ member_id: data.value.id });
            data.value.is_favorite = true;
        }
    } catch (error) {
        console.error(error);
    }
}

onLoad((options) => {
    getMbrDetailApi({
        id: options?.id,
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

.action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: transparent;
    box-shadow: none;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 40rpx 40rpx;
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    z-index: 99;
    gap: 30rpx;
    pointer-events: none;
}

.action-btn {
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    border-radius: 44rpx;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    .btn-text {
        font-size: 32rpx;
        font-weight: 500;
        margin-left: 12rpx;
    }

    &:active {
        transform: scale(0.96);
        opacity: 0.9;
    }
}

.like-btn {
    flex: 0.35;
    background-color: #ffffff;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
    border: 2rpx solid transparent;

    .btn-text {
        color: #333;
    }

    &.is-active {
        background: linear-gradient(135deg, #fff0f3 0%, #ffe6eb 100%);
        border: 2rpx solid rgba(255, 77, 109, 0.3);
        box-shadow: 0 8rpx 24rpx rgba(255, 77, 109, 0.15);

        .btn-text {
            color: #ff4d6d;
        }
    }
}

.contact-btn {
    flex: 0.65;
    background: linear-gradient(135deg, #ff4d6d 0%, #ff758c 100%);
    box-shadow: 0 8rpx 24rpx rgba(255, 77, 109, 0.3);

    .btn-text {
        color: #fff;
        font-weight: 600;
        letter-spacing: 2rpx;
    }

    &:active {
        box-shadow: 0 4rpx 12rpx rgba(255, 77, 109, 0.2);
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