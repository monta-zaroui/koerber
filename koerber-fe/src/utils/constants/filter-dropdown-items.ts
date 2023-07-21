import type { DropdownItem } from '../../models/dropdown.model.ts';

export const filterDropdownItems: DropdownItem[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Device Name',
    value: 'name'
  },
  {
    label: 'Device Type',
    value: 'type'
  },
  {
    label: 'Device Owner',
    value: 'ownerName'
  },
  {
    label: 'Battery Status',
    value: 'batteryStatus'
  }
];
