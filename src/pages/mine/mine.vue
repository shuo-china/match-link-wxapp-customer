<template>
    <view class="container">
        <template v-if="userLevel === UserLevel.Bound">
            <!-- 顶部背景与个人信息 -->
            <view class="profile-header">
                <view class="header-bg-shape"></view>
                <view class="user-info-section">
                    <view class="avatar">
                        <uni-icons type="person-filled" size="50" color="#d1d1d1"></uni-icons>
                    </view>
                    <view class="info-text">
                        <text class="nickname">{{ userInfo?.mobile }}</text>
                        <view class="tags">
                            <text class="user-id">ID: {{ userInfo?.id }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="content-wrapper">
                <!-- 功能菜单 -->
                <view class="menu-group">
                    <view class="menu-item" @tap="handleFavorite">
                        <view class="item-left">
                            <view class="icon-box heart">
                                <uni-icons type="heart-filled" size="18" color="#fff"></uni-icons>
                            </view>
                            <text class="item-text">我喜欢的</text>
                        </view>
                        <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                    </view>
                    <view class="menu-item" @tap="handleUnbind">
                        <view class="item-left">
                            <view class="icon-box settings">
                                <uni-icons type="settings-filled" size="18" color="#fff"></uni-icons>
                            </view>
                            <text class="item-text">账户解绑</text>
                        </view>
                        <uni-icons type="right" size="16" color="#ccc"></uni-icons>
                    </view>
                </view>
            </view>
        </template>

        <template v-else>
            <view class="login-full-page">
                <view class="login-content">
                    <image class="login-logo" src="/static/logo.png" mode="aspectFill"></image>
                    <view class="login-text-group">
                        <text class="app-name">叁生禧</text>
                        <text class="slogan">开启您的浪漫邂逅之旅</text>
                    </view>
                    <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="login" :loading="loading"
                        :disabled="loading">
                        <uni-icons type="weixin" size="22" color="#fff" style="margin-right: 6px;"></uni-icons>
                        微信一键登录
                    </button>
                    <text class="login-tips">登录即代表同意《用户协议》与《隐私政策》</text>
                </view>
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
        userStore.bindMobile(e.detail.code).then(() => {
            console.log(userInfo.value)
        }).finally(() => {
            loading.value = false;
        });
    }
};

const handleFavorite = () => {
    uni.navigateTo({
        url: '/pages/favorite/favorite'
    });
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
    padding-bottom: 20px;
}

.profile-header {
    position: relative;
    padding: 60px 20px 80px;
    overflow: hidden;

    .header-bg-shape {
        position: absolute;
        top: 0;
        left: -10%;
        width: 120%;
        height: 100%;
        background: linear-gradient(135deg, #764c24 0%, #9e6b3d 100%);
        border-bottom-left-radius: 50% 20%;
        border-bottom-right-radius: 50% 20%;
        z-index: 0;
    }

    .user-info-section {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;

        .avatar {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 12px rgba(118, 76, 36, 0.2);
            margin-right: 16px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .info-text {
            flex: 1;

            .nickname {
                font-size: 22px;
                font-weight: bold;
                color: #fff;
                margin-bottom: 8px;
                display: block;
            }

            .tags {
                display: flex;
                align-items: center;
                gap: 8px;

                .user-id {
                    font-size: 12px;
                    color: #fff;
                    background-color: rgba(255, 255, 255, 0.2);
                    padding: 2px 10px;
                    border-radius: 12px;
                }
            }
        }
    }
}

.content-wrapper {
    padding: 0 20px;
    margin-top: -40px;
    position: relative;
    z-index: 2;
}

.menu-group {
    background-color: #fff;
    border-radius: 16px;
    padding: 0 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

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

            .icon-box {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;

                &.heart {
                    background: linear-gradient(135deg, #ff7e79 0%, #f05053 100%);
                }

                &.settings {
                    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
                }
            }

            .item-text {
                font-size: 16px;
                color: #333;
                font-weight: 500;
            }
        }

        &:active {
            opacity: 0.7;
        }
    }
}

.login-full-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -10%;
        left: -10%;
        width: 120%;
        height: 50%;
        background: radial-gradient(circle, rgba(118, 76, 36, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
        z-index: 0;
    }

    .login-content {
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 0 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }

    .login-logo {
        width: 100px;
        height: 100px;
        margin-bottom: 24px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(118, 76, 36, 0.15);
    }

    .login-text-group {
        text-align: center;
        margin-bottom: 48px;

        .app-name {
            display: block;
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 12px;
            letter-spacing: 2px;
        }

        .slogan {
            font-size: 15px;
            color: #999;
            letter-spacing: 1px;
        }
    }

    .login-btn {
        width: 100%;
        height: 50px;
        background: linear-gradient(135deg, #764c24 0%, #9e6b3d 100%);
        color: white;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0 10px 20px rgba(118, 76, 36, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        &:active {
            transform: scale(0.98);
        }

        &::after {
            border: none;
        }
    }

    .login-tips {
        font-size: 12px;
        color: #ccc;
    }
}
</style>