<template>
    <uni-popup ref="popupRef" @change="handleChange">
        <view class="popup-wrapper">
            <slot></slot>
            <view class="btn-wrapper">
                <button class="reset-btn" @tap="handleReset">重置</button>
                <button class="search-btn" @tap="handleSearch">查询</button>
            </view>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(["search", "reset"]);

const visible = defineModel('visible', { type: Boolean, default: false })
let currentShow = visible.value

const popupRef = ref()

const handleChange = ({ show }) => {
    currentShow = show
    visible.value = show
}

const handleReset = () => {
    visible.value = false
    emit('reset')
}

const handleSearch = () => {
    visible.value = false
    emit('search')
}

watch(visible, (newVal) => {
    if (newVal === currentShow) {
        return
    }
    if (newVal) {
        popupRef.value.open('bottom')
    } else {
        popupRef.value.close()
    }
})
</script>

<style lang="scss" scoped>
.popup-wrapper {
    padding: 24px 18px;
    background-color: #fff;

    .btn-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        margin-top: 20px;

        button {
            flex: 1;
            font-size: 16px;
            height: 44px;
            line-height: 44px;
            border-radius: 22px;
            border: none;
            
            &::after {
                border: none;
            }
        }

        .reset-btn {
            background-color: #f5f6f8;
            color: #666;
        }

        .search-btn {
            background: linear-gradient(135deg, #ff9a9e 0%, #ff758c 100%);
            color: #fff;
            box-shadow: 0 4px 10px rgba(255, 117, 140, 0.3);
        }
    }
}
</style>