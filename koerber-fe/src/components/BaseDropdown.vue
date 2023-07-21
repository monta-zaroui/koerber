<script setup lang="ts">
import { useDeviceStore } from '../stores/device';
import { filterDropdownItems } from '../utils/constants/filter-dropdown-items';

const deviceStore = useDeviceStore();
</script>

<template>
  <select v-model="deviceStore.state.filterValue" class="select select-bordered join-item">
    <option v-for="item in filterDropdownItems" :key="item.value" :value="item.value">{{ item.label }}</option>
  </select>
</template>

<style scoped lang="scss"></style>
