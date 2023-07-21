<script setup lang="ts">
const props = defineProps<{
  type: string;
  placeholder: string;
  modelValue: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <input
    class="input join-item input-bordered input-md w-full max-w-sm"
    :type="props.type"
    :placeholder="props.placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
