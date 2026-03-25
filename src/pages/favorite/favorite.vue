<template>
    <view class="favorite-container">
        <!-- 会员列表 -->
        <view class="member-list" v-if="data.length > 0">
            <view class="favorite-item" v-for="(item, index) in data" :key="index" @tap="toDetail(item)">
                <!-- 头像区域 -->
                <view class="avatar-box">
                    <image class="avatar-img" :src="item.member.cover?.path || '/static/logo.png'" mode="aspectFill"></image>
                </view>

                <!-- 信息区域 -->
                <view class="info-box">
                    <view class="basic-info">
                        <text>{{ item.member.age }}岁</text>
                        <text class="divider">|</text>
                        <text>{{ item.member.height }}cm</text>
                        <text class="divider">|</text>
                        <text>{{ item.member.education_text }}</text>
                    </view>
                    <view class="tags-wrapper">
                        <view class="info-tag" :class="item.member.gender === '1' ? 'blue-tag' : 'pink-tag'"
                            v-if="item.member.job_text">
                            <text class="tag-text">{{ item.member.job_text }}</text>
                        </view>
                    </view>
                </view>

                <!-- 操作箭头 -->
                <view class="action-box">
                    <uni-icons type="right" size="18" color="#ccc"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 空数据提示 -->
        <view v-else-if="loadMoreStatus === 'nomore' && data.length === 0" class="empty-tip">
            <uni-icons type="info" size="40" color="#ccc"></uni-icons>
            <text class="empty-text">暂无喜欢的会员</text>
        </view>

        <!-- 加载更多 -->
        <view class="load-more" v-if="data.length > 0">
            <uni-load-more :status="loadMoreStatus"></uni-load-more>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getFavoritePaginationApi } from "@/api/favorite";
import useLoadMore from '@/hooks/useLoadMore';
import { onShow } from "@dcloudio/uni-app";

// 使用封装好的 hook 获取喜欢的会员列表
const { data, loadMoreStatus, reset } = useLoadMore((params) => {
    return getFavoritePaginationApi({ ...params });
});

// 跳转到会员详情页
const toDetail = (item) => {
    uni.navigateTo({
        url: '/pages/mbr/detail?id=' + item.member.id,
    });
};

// 每次进入页面时刷新列表，确保详情页取消喜欢后列表数据保持同步
onShow(() => {
    reset();
});
</script>

<style lang="scss" scoped>
.favorite-container {
    min-height: 100vh;
    background-color: #f7f8fa;
    padding: 10px;
}

.member-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.favorite-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

    .avatar-box {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        margin-right: 16px;
        background-color: #f0f0f0;
        border: 1px solid #f5f5f5;

        .avatar-img {
            width: 100%;
            height: 100%;
        }
    }

    .info-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        .basic-info {
            display: flex;
            align-items: center;
            font-size: 15px;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;

            .divider {
                margin: 0 8px;
                color: #e0e0e0;
                font-weight: normal;
                font-size: 12px;
            }
        }

        .tags-wrapper {
            display: flex;

            .info-tag {
                display: inline-flex;
                align-items: center;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 12px;

                &.pink-tag {
                    background-color: #fff0f3;
                    color: #ff758c;
                }

                &.blue-tag {
                    background-color: #f0f7ff;
                    color: #66a6ff;
                }

                .tag-text {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .action-box {
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.empty-tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;

    .empty-text {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
    }
}

.load-more {
    padding: 8px 0;
}
</style>