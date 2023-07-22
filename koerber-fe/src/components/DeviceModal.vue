<script setup lang="ts">
import { computed } from 'vue';
import BaseInput from './BaseInput.vue';
import BaseDropdown from './BaseDropdown.vue';
import { deviceTypeDropdownItems } from '../utils/constants/device-type-dropdown-items';
import { useDeviceStore } from '../stores/device.ts';
import { storeToRefs } from 'pinia';

const deviceStore = useDeviceStore();
const { selectedDevice, isCreatingOrUpdating } = storeToRefs(deviceStore);

const isSaveButtonDisabled = computed(() => {
  return selectedDevice.value.name === '' || selectedDevice.value.ownerName === '';
});

const toggleModal = () => {
  deviceStore.state.showAddDeviceModal = !deviceStore.state.showAddDeviceModal;
};

const updateDevice = () => {
  deviceStore.state.isCreatingOrUpdating = true;
  deviceStore.updateDevice().then(() => {
    deviceStore.state.isCreatingOrUpdating = false;
    toggleModal();
  });
};
</script>

<template>
  <div>
    <button class="btn btn-neutral float-right" @click="toggleModal">
      <font-awesome-icon :icon="['fas', 'plus']" /> Add Device
    </button>

    <div v-if="deviceStore.state.showAddDeviceModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-xl">Create new device</h3>
        <div class="py-2 w-full">
          <BaseInput v-model="selectedDevice.name" placeholder="Devince Name" type="text" class="w-full py-2" />
          <BaseDropdown
            v-model="selectedDevice.type"
            :items="deviceTypeDropdownItems"
            placeholder="Device Type"
            class="w-full"
          />
          <BaseInput v-model="selectedDevice.ownerName" placeholder="Devince Name" type="text" class="w-full py-2" />
          <h3 class="font-bold text-md py-2">Battery status: {{ selectedDevice.batteryStatus }}%</h3>
          <input
            type="range"
            min="0"
            max="100"
            v-model="deviceStore.state.selectedDevice.batteryStatus"
            class="range range-success w-full"
          />
        </div>
        <div class="modal-action">
          <button class="btn" @click="toggleModal">Close modal</button>
          <button class="btn btn-neutral" :disabled="isSaveButtonDisabled" @click="updateDevice">
            <span v-if="isCreatingOrUpdating" class="loading loading-dots loading-md"></span>
            <span v-else>Save Device</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
