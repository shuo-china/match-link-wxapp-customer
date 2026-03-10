<template>
    <view class="container">
        <template v-if="userLevel === UserLevel.Bound">
            <!-- 顶部背景 -->
            <view class="header-bg">
                <view class="bg-circle-1"></view>
                <view class="bg-circle-2"></view>
                <!-- 用户信息卡片 -->
                <view class="user-card">
                    <view class="user-info">
                        <view class="avatar-box">
                            <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
                        </view>
                        <view class="info-text">
                            <view class="name-row">
                                <text class="nickname">{{ userInfo?.mobile }}</text>
                            </view>
                            <text class="user-id">ID: {{ userInfo?.id }}</text>
                        </view>
                        <view class="arrow-box">
                            <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                        </view>
                    </view>
                </view>
            </view>

            <view class="content-wrapper">
                <!-- 功能菜单 -->
                <view class="menu-group">
                    <view class="menu-item">
                        <view class="item-left">
                            <uni-icons type="person-filled" size="22" color="#ff758c"></uni-icons>
                            <text class="item-text">我的资料</text>
                        </view>
                        <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                    </view>
                    <view class="menu-item">
                        <view class="item-left">
                            <uni-icons type="heart-filled" size="22" color="#ff758c"></uni-icons>
                            <text class="item-text">心动记录</text>
                        </view>
                        <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                    </view>
                    <view class="menu-item" @click="handleUnbind">
                        <view class="item-left">
                            <uni-icons type="settings-filled" size="22" color="#ff758c"></uni-icons>
                            <text class="item-text">解除绑定</text>
                        </view>
                        <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                    </view>
                </view>
            </view>
        </template>

        <template v-else>
            <view class="login-full-page">
                <image class="login-logo" src="/static/logo.png" mode="widthFix"></image>
                <view class="login-text-group">
                    <text class="app-name">叁生禧</text>
                    <text class="slogan">开启您的浪漫邂逅之旅</text>
                </view>
                <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="login" :loading="loading"
                    :disabled="loading">微信一键登录</button>
            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { UserLevel } from '@/utils/enums';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUserStore();
const { userLevel, userInfo } = storeToRefs(userStore);

const loading = ref(false);
const login = (e: any) => {
    if (e.detail.code) {
        loading.value = true;
        userStore.bindMobile(e.detail.code).finally(() => {
            loading.value = false;
        });
    }
};

const handleUnbind = () => {
    uni.showModal({
        title: '提示',
        content: '确定要解除绑定吗？',
        success: async (res) => {
            if (res.confirm) {
                uni.showLoading({
                    title: '解除绑定中',
                    mask: true
                });
                try {
                    await userStore.unBindMobile();
                } catch (error) {
                    uni.showToast({
                        title: '解除绑定失败',
                        icon: 'none'
                    });
                } finally {
                    uni.hideLoading();
                }
            }
        }
    });
};

</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    background-color: #f7f8fa;
    position: relative;
}

.header-bg {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
    width: 100%;
    padding: 30px 20px 40px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-bottom: 20px;

    .bg-circle-1 {
        position: absolute;
        top: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        pointer-events: none;
    }

    .bg-circle-2 {
        position: absolute;
        bottom: -20px;
        left: -20px;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        pointer-events: none;
    }
}

.content-wrapper {
    padding: 0 20px 20px;
    margin-top: -50px; // 让内容部分上移，产生重叠效果
    position: relative;
    z-index: 1;
}

.user-card {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 24px 20px;
    box-shadow: 0 10px 30px rgba(255, 117, 140, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);

    .user-info {
        display: flex;
        align-items: center;

        .avatar-box {
            position: relative;
            margin-right: 16px;

            .avatar {
                padding: 5px;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border: 3px solid #fff;
                box-shadow: 0 4px 12px rgba(255, 117, 140, 0.3);
            }
        }

        .info-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name-row {
                display: flex;
                align-items: center;
                margin-bottom: 6px;

                .nickname {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    margin-right: 8px;
                }
            }

            .user-id {
                font-size: 12px;
                color: #999;
                background-color: #f5f5f5;
                padding: 2px 8px;
                border-radius: 4px;
                align-self: flex-start;
            }
        }

        .arrow-box {
            margin-left: 10px;
        }
    }
}

.login-full-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
    padding: 0 40px;

    .login-logo {
        width: 140px;
        height: 140px;
        margin-bottom: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(255, 117, 140, 0.2);
    }

    .login-text-group {
        text-align: center;
        margin-bottom: 40px;

        .app-name {
            display: block;
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 12px;
        }

        .slogan {
            font-size: 16px;
            color: #999;
        }
    }

    .login-btn {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: linear-gradient(135deg, #ff9a9e 0%, #ff758c 100%);
        color: white;
        border-radius: 25px;
        font-size: 18px;
        font-weight: 500;
        box-shadow: 0 10px 20px rgba(255, 117, 140, 0.3);

        &:active {
            opacity: 0.9;
            transform: scale(0.98);
        }

        &::after {
            border: none;
        }
    }
}

.menu-group {
    margin-top: 20px;
    background-color: white;
    border-radius: 16px;
    padding: 0 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

    .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
            border-bottom: none;
        }

        .item-left {
            display: flex;
            align-items: center;

            .item-text {
                font-size: 16px;
                color: #333;
                margin-left: 12px;
            }
        }

        &:active {
            opacity: 0.7;
        }
    }
}
</style>