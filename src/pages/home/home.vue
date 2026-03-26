<template>
  <view class="home-container">
    <view class="header">
      <text class="title">推荐嘉宾</text>
      <view class="filter-btn" @tap="searchFormVisible = true">
        <text>筛选</text>
        <uni-icons type="tune" size="16" color="#333"></uni-icons>
      </view>
    </view>

    <view class="member-list">
      <view class="member-card" v-for="(item, index) in data" :key="index" @tap="toDetail(item)">
        <!-- 封面图区域 -->
        <view class="card-header">
          <image class="cover-img" :src="item.coverPath || '/static/logo.png'" mode="aspectFill"></image>
          <view class="vip-badge" v-if="item.vipLevel === '2'">
            <text class="vip-text">VIP</text>
          </view>
        </view>

        <!-- 信息区域 -->
        <view class="card-body">
          <view class="basic-info">
            <text>{{ item.age }}岁</text>
            <text class="divider">·</text>
            <text>{{ item.height }}cm</text>
            <text class="divider">·</text>
            <text>{{ item.education_text }}</text>
          </view>
          <view class="tags-wrapper">
            <view class="info-tag" :class="item.gender === '1' ? 'blue-tag' : 'pink-tag'" v-if="item.job_text">
              <text class="tag-text">{{ item.job_text }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="login-tip-wrapper" v-if="!isLoggedIn && showLoginBtn">
      <button class="login-btn" @tap="toLogin">登录查看更多</button>
    </view>
    <view v-else class="load-more">
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </view>
  </view>

  <search-form v-model:visible="searchFormVisible" @search="handleSearch" />
</template>

<script setup lang="ts">
import { getMbrPaginationApi } from "@/api/mbr";
import useLoadMore from '@/hooks/useLoadMore';
import { useUserStore } from "@/stores/user";
import { UserLevel } from "@/utils/enums";
import { onShow } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import SearchForm from "./components/search-form.vue";

const searchFormVisible = ref(false)
const handleSearch = (data) => {
  search(data)
}

const userStore = useUserStore();
const { userLevel } = storeToRefs(userStore)
const showLoginBtn = ref(false)

const isLoggedIn = computed(() => userLevel.value === UserLevel.Bound)

let randSeed = ''
const generateRandSeed = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const { data, loadMoreStatus, search, next } =
  useLoadMore((params) => {
    return getMbrPaginationApi({ ...params, randSeed })
  }, () => {
    if (isLoggedIn.value) {
      return true;
    } else {
      showLoginBtn.value = true
      return false;
    }
  }, {
    onBefore(args) {
      const page = args[0]?.page
      if (page === 1) {
        randSeed = generateRandSeed()
      }
    },

  });

const toLogin = () => {
  uni.switchTab({
    url: '/pages/mine/mine',
  })
}

const toDetail = (item) => {
  if (!isLoggedIn.value) {
    uni.showModal({
      content: '登录查看详情',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          toLogin()
        }
      }
    })
  } else {
    uni.navigateTo({
      url: '/pages/mbr/detail?id=' + item.id,
    })
  }
}

onShow(() => {
  if (isLoggedIn.value) {
    next()
  }
}) 
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 0 10px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #f7f8fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  margin-bottom: 5px;

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    text {
      margin-right: 4px;
    }
  }
}

.member-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.member-card {
  width: calc(50% - 5px);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 133%; // 3:4 比例

  .cover-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .vip-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
    padding: 4px 12px;
    border-radius: 14px;
    border: 1px solid rgba(235, 209, 151, 0.5);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    .vip-text {
      color: #ebd197;
      font-size: 12px;
      font-weight: 600;
      font-style: italic;
      letter-spacing: 1px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
}

.card-body {
  padding: 10px 5px;

  .basic-info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #333;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .divider {
      margin: 0 4px;
      color: #999;
      font-size: 12px;
    }
  }

  .tags-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;

    .info-tag {
      display: flex;
      align-items: center;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 12px;
      max-width: 100%;
      box-sizing: border-box;

      &.pink-tag {
        background-color: #fff0f3;
        color: #ff758c;
      }

      &.blue-tag {
        background-color: #f0f7ff;
        color: #66a6ff;
      }

      .tag-text {
        margin-left: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

.login-tip-wrapper {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.login-btn {
  width: 200px;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(135deg, #764c24 0%, #9e6b3d 100%);
  color: white;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(118, 76, 36, 0.3);
  margin: 0;

  &:active {
    opacity: 0.9;
    transform: scale(0.98);
  }

  &::after {
    border: none;
  }
}

.load-more {
  padding: 8px 0;
}
</style>