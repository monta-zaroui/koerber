<script setup lang="ts">
import { useDeviceStore } from '../stores/device';
import DeviceModal from './DeviceModal.vue';

const deviceStore = useDeviceStore();
const toggleModal = () => {
  deviceStore.state.showAddDeviceModal = !deviceStore.state.showAddDeviceModal;
};
</script>

<template>
  <div>
    <button class="btn btn-neutral float-right" @click="toggleModal">
      <font-awesome-icon :icon="['fas', 'plus']" /> Add Device
    </button>
    <DeviceModal v-if="deviceStore.state.showAddDeviceModal" @toggle="toggleModal" />
  </div>
</template>
