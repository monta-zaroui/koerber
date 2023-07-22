<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import { newDevice } from '../models/device.model';
import BaseDropdown from './BaseDropdown.vue';
import { deviceTypeDropdownItems } from '../utils/constants/device-type-dropdown-items';

const showModal = ref(false);
function toggleModal(): void {
  showModal.value = !showModal.value;
}
</script>

<template>
  <div>
    <button class="btn btn-neutral float-right" @click="toggleModal">
      <font-awesome-icon :icon="['fas', 'plus']" /> Add Device
    </button>

    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-xl">Create new device</h3>
        <div class="py-2 w-full">
          <BaseInput v-model="newDevice.name" placeholder="Devince Name" type="text" class="w-full py-2" />
          <BaseDropdown
            v-model="newDevice.type"
            :items="deviceTypeDropdownItems"
            placeholder="Device Type"
            class="w-full"
          />
          <BaseInput v-model="newDevice.ownerName" placeholder="Devince Name" type="text" class="w-full py-2" />
          <h3 class="font-bold text-md py-2">Battery status: {{ newDevice.batteryStatus }}%</h3>
          <input type="range" min="0" max="100" v-model="newDevice.batteryStatus" class="range range-success w-full" />
        </div>
        <div class="modal-action">
          <button class="btn" @click="toggleModal">Close modal</button>
          <button class="btn btn-neutral" @click="toggleModal">Save Device</button>
        </div>
      </div>
    </div>
  </div>
</template>
