import { defineStore } from 'pinia';
import { Device } from '../models/device.model';
import axios, { AxiosError } from 'axios';
import { computed, ref } from 'vue';

interface IStore {
  devices: Device[];
  selectedDevice: Device;
  loading: boolean;
  error: AxiosError | null;
}
export const useDeviceStore = defineStore('device', () => {
  const state = ref<IStore>({
    devices: [],
    selectedDevice: {} as Device,
    loading: false,
    error: null
  });

  async function fetchDevices(): Promise<void> {
    state.value.loading = true;
    try {
      const response = await axios.get<Device[]>('http://localhost:3007/koerber/devices');
      state.value.devices = response.data;
      console.log(state.value.devices);
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  async function addDevice(device: Device): Promise<void> {
    state.value.loading = true;
    try {
      await axios.post('http://localhost:3000/koerber/devices', device);
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  async function updateDevice(device: Device): Promise<void> {
    state.value.loading = true;
    try {
      await axios.put(`http://localhost:3000/koerber/devices/${device.id}`, device);
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  async function deleteDevice(id: string): Promise<void> {
    state.value.loading = true;
    try {
      await axios.delete(`http://localhost:3000/koerber/devices/${id}`);
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  return {
    devices: computed(() => state.value.devices),
    selectedDevice: computed(() => state.value.selectedDevice),
    loading: computed(() => state.value.loading),
    error: computed(() => state.value.error),
    fetchDevices,
    addDevice,
    updateDevice,
    deleteDevice
  };
});
