<script setup lang="ts">
import BaseTable from './components/BaseTable.vue';
import { useDeviceStore } from './stores/device.ts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const deviceStore = useDeviceStore();
const { devices } = storeToRefs(deviceStore);

onMounted(() => {
  deviceStore.fetchDevices();
});
</script>

<template>
  <BaseTable :devices="devices" />
</template>
