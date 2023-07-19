<script setup lang="ts">
import { Device } from '../models/device.model.ts';

defineProps<{
  devices: Device[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-xs table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th></th>
          <td>Device Name</td>
          <td>Device Type</td>
          <td>Owner Name</td>
          <td>Battery Status</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(device, index) in devices" :key="index">
          <th>{{ index }}</th>
          <td>{{ device.name }}</td>
          <td>{{ device.type }}</td>
          <td>{{ device.ownerName }}</td>
          <td>{{ device.batteryStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
