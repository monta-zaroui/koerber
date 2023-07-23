import { defineStore } from 'pinia';
import { type Device, newDevice } from '../models/device.model';
import axios, { AxiosError } from 'axios';
import { computed, ref } from 'vue';
import { SortConfig } from '../models/sort.model';

interface IStore {
  devices: Device[];
  selectedDevice: Device;
  searchValue: string;
  filterValue: string;
  showAddDeviceModal: boolean;
  loading: boolean;
  isCreatingOrUpdating: boolean;
  error: AxiosError | null;
}
export const useDeviceStore = defineStore('device', () => {
  const state = ref<IStore>({
    devices: [],
    selectedDevice: newDevice,
    searchValue: '',
    filterValue: 'all',
    showAddDeviceModal: false,
    loading: false,
    isCreatingOrUpdating: false,
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
      const item: string = device[state.value.filterValue as keyof Device]!.toString().toLowerCase();
      return item.includes(state.value.searchValue.toLowerCase());
    });
  });

  async function fetchDevices(): Promise<void> {
    state.value.loading = true;
    try {
      const { data } = await axios.get<Device[]>('http://localhost:3007/koerber/devices');
      state.value.devices = data as Device[];
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  async function addDevice(): Promise<void> {
    state.value.loading = true;
    try {
      const { data } = await axios.post<Device>('http://localhost:3007/koerber/devices', state.value.selectedDevice);
      state.value.devices.push(data as Device);
      resetSelectedDevice();
      state.value.showAddDeviceModal = false;
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.loading = false;
    }
  }

  async function updateDevice(): Promise<void> {
    state.value.isCreatingOrUpdating = true;
    try {
      await axios.put('http://localhost:3007/koerber/devices', state.value.selectedDevice);
      const index = state.value.devices.findIndex((device: Device) => device.id === state.value.selectedDevice.id);
      Object.assign(state.value.devices[index], state.value.selectedDevice);
      resetSelectedDevice();
      state.value.showAddDeviceModal = false;
    } catch (error) {
      state.value.error = error as AxiosError;
    } finally {
      state.value.isCreatingOrUpdating = false;
    }
  }

  async function deleteDevice(id: string): Promise<void> {
    state.value.loading = true;
    try {
      await axios.delete(`http://localhost:3007/koerber/devices/${id}`);
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
        return a[column]! > b[column]! ? 1 : -1;
      }
      return a[column]! < b[column]! ? 1 : -1;
    });
  }

  function resetSelectedDevice(): void {
    state.value.selectedDevice = { ...newDevice } as Device;
  }

  return {
    state,
    devices: computed(() => state.value.devices),
    selectedDevice: computed(() => state.value.selectedDevice),
    searchValue: computed(() => state.value.searchValue),
    loading: computed(() => state.value.loading),
    isCreatingOrUpdating: computed(() => state.value.isCreatingOrUpdating),
    error: computed(() => state.value.error),
    filterDevices,
    fetchDevices,
    sortDevices,
    addDevice,
    updateDevice,
    deleteDevice
  };
});
