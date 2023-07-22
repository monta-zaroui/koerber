<script setup lang="ts">
const props = defineProps<{
  type: string;
  placeholder: string;
  modelValue: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full">
    <input
      class="input join-item input-bordered w-full"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
