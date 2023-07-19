<script setup lang="ts">
import { useDeviceStore } from '../stores/device';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { SortConfig } from '../models/sort.model.ts';
import { Device } from '../models/device.model.ts';

const deviceStore = useDeviceStore();
const { devices, loading } = storeToRefs(deviceStore);

const sortConfig: SortConfig<Device> = {
  column: 'id',
  order: 'asc'
};

onMounted(() => {
  deviceStore.fetchDevices();
});

const sortIcon = computed(() => {
  return (column: keyof Device) => {
    if (sortConfig.column === column) {
      return sortConfig.order === 'asc' ? 'sort-up' : 'sort-down';
    }
    return '';
  };
});

const sortDevices = (column: keyof Device) => {
  if (sortConfig.column === column) {
    sortConfig.order = sortConfig.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortConfig.column = column;
    sortConfig.order = 'asc';
  }
  deviceStore.sortDevices(sortConfig);
};

const isIconVisible = computed(() => {
  return (column: keyof Device) => sortConfig.column === column;
});
</script>

<template>
  <div>
    <div v-if="loading" class="text-center pt-96">
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="table table-md table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td @click="sortDevices('name')">
              <span>Device Name</span>
              <font-awesome-icon class="pl-2" v-if="isIconVisible('name')" :icon="['fas', sortIcon('name')]" />
            </td>
            <td @click="sortDevices('type')">
              <span>Device Device Type</span>
              <font-awesome-icon v-if="isIconVisible('type')" class="pl-2" :icon="['fas', sortIcon('type')]" />
            </td>
            <td @click="sortDevices('ownerName')">
              <span>Device Owner</span>
              <font-awesome-icon
                v-if="isIconVisible('ownerName')"
                class="pl-2"
                :icon="['fas', sortIcon('ownerName')]"
              />
            </td>
            <td @click="sortDevices('batteryStatus')">
              <span>Battery Status</span>
              <font-awesome-icon
                v-if="isIconVisible('batteryStatus')"
                class="pl-2"
                :icon="['fas', sortIcon('batteryStatus')]"
              />
            </td>
            <td colspan="2"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in devices" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ device.name }}</td>
            <td>{{ device.type }}</td>
            <td>{{ device.ownerName }}</td>
            <td>{{ device.batteryStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>