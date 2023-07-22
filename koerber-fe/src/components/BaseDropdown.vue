<script setup lang="ts">
import type { DropdownItem } from '../models/dropdown.model.ts';
import { computed } from 'vue';

const props = defineProps<{
  items: DropdownItem[];
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  }
});
</script>

<template>
  <select v-model="internalValue" class="select select-bordered join-item">
    <option v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</option>
  </select>
</template>

<style scoped lang="scss"></style>
