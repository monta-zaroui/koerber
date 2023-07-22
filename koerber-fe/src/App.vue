<script setup lang="ts">
import DevicesTable from './components/DevicesTable.vue';
import BaseNavBar from './components/BaseNavBar.vue';
import BaseInput from './components/BaseInput.vue';
import { useDeviceStore } from './stores/device.ts';
import BaseDropdown from './components/BaseDropdown.vue';
import DeviceModal from './components/DeviceModal.vue';
import { filterDropdownItems } from './utils/constants/filter-dropdown-items';

const deviceStore = useDeviceStore();
</script>

<template>
  <div class="container mx-auto mt-4">
    <BaseNavBar>
      <div class="flex w-full">
        <div class="join w-full">
          <BaseInput v-model="deviceStore.state.searchValue" placeholder="Search..." type="text" />
          <BaseDropdown v-model="deviceStore.state.filterValue" :items="filterDropdownItems" />
        </div>
        <div class="w-full">
          <DeviceModal />
        </div>
      </div>
    </BaseNavBar>
    <DevicesTable class="mt-20" />
  </div>
</template>
