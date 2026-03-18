<template>
    <pro-search-form v-model:visible="visible" @reset="handleReset" @search="handleSearch">
        <uni-forms label-position="top">
            <uni-forms-item label="性别" name="gender">
                <uni-data-checkbox mode="tag" v-model="searchFormData.gender"
                    :localdata="dict?.gender"></uni-data-checkbox>
            </uni-forms-item>
            <uni-forms-item label="学历" name="education">
                <uni-data-select v-model="searchFormData.education" :localdata="dict?.education" :multiple="true" />
            </uni-forms-item>
            <uni-forms-item label="婚姻" name="marital_status">
                <uni-data-select v-model="searchFormData.maritalStatus" :localdata="dict?.marital_status"
                    :multiple="true" />
            </uni-forms-item>
            <uni-forms-item label="年龄" name="age" label-position="left">
                <pro-slider-range v-model="searchFormData.age" :show-value="true" :min-unlimited="true"
                    :max-unlimited="true" :min=15 :max="60" :value-formatter="(v) => v + '岁'" />
            </uni-forms-item>
            <uni-forms-item label="身高" name="height" label-position="left">
                <pro-slider-range v-model="searchFormData.height" :show-value="true" :min-unlimited="true"
                    :max-unlimited="true" :min=140 :max="200" :value-formatter="(v) => v + 'cm'" />
            </uni-forms-item>
        </uni-forms>
    </pro-search-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useDict from '@/hooks/useDict';

const visible = defineModel<boolean>('visible', { default: false });

const emit = defineEmits<{
    (e: 'search', params: any): void
}>();

const { dict } = useDict(['education', 'marital_status', 'gender']);

const getInitialSearchFormData = () => ({
    gender: null,
    age: [null, null],
    height: [null, null],
    education: [],
    maritalStatus: []
})
const searchFormData = ref(getInitialSearchFormData())

const handleReset = () => {
    searchFormData.value = getInitialSearchFormData()
    emit('search', searchFormData.value);
};

const handleSearch = () => {
    emit('search', searchFormData.value);
};
</script>