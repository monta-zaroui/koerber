<script setup lang="ts">
import DevicesTable from './components/DevicesTable.vue';
import BaseNavBar from './components/BaseNavBar.vue';
import BaseInput from './components/BaseInput.vue';
import { useDeviceStore } from './stores/device.ts';
import BaseDropdown from './components/BaseDropdown.vue';

const deviceStore = useDeviceStore();
</script>

<template>
  <div class="container mx-auto mt-4">
    <BaseNavBar>
      <div class="join w-full">
        <BaseInput v-model="deviceStore.state.searchValue" placeholder="Search..." type="text" />
        <BaseDropdown :items="['All', 'Online', 'Offline']" />
      </div>
    </BaseNavBar>
    <DevicesTable class="mt-20" />
  </div>
</template>
