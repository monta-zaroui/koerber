import { defineStore } from 'pinia';
import { Device } from '../models/device.model';
import axios, { AxiosError } from 'axios';
import { computed, ref } from 'vue';
import { SortConfig } from '../models/sort.model';

interface IStore {
  devices: Device[];
  selectedDevice: Device;
  searchValue: string;
  filterValue: string;
  loading: boolean;
  error: AxiosError | null;
}
export const useDeviceStore = defineStore('device', () => {
  const state = ref<IStore>({
    devices: [],
    selectedDevice: {} as Device,
    searchValue: '',
    filterValue: 'all',
    loading: false,
    error: null
  });

  const filterDevices = computed((): Device[] => {
    if (state.value.filterValue === 'all') {
      return state.value.devices.filter((device: Device) => {
        const searchableAttributes = Object.values(device).slice(1).join(' ');
        return searchableAttributes.toLowerCase().includes(state.value.searchValue.toLowerCase());
      });
    }
    return state.value.devices.filter((device: Device) => {
      const item: string = device[state.value.filterValue as keyof Device].toString().toLowerCase();
      return item.includes(state.value.searchValue.toLowerCase());
    });
  });

  async function fetchDevices(): Promise<void> {
    state.value.loading = true;
    try {
      const response = await axios.get<Device[]>('http://localhost:3007/koerber/devices');
      state.value.devices = response.data;
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
  function sortDevices(config: SortConfig<Device>): void {
    const { column, order } = config;
    state.value.devices.sort((a: Device, b: Device) => {
      if (order === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      }
      return a[column] < b[column] ? 1 : -1;
    });
  }

  return {
    state,
    devices: computed(() => state.value.devices),
    selectedDevice: computed(() => state.value.selectedDevice),
    searchValue: computed(() => state.value.searchValue),
    loading: computed(() => state.value.loading),
    error: computed(() => state.value.error),
    filterDevices,
    fetchDevices,
    sortDevices,
    addDevice,
    updateDevice,
    deleteDevice
  };
});
