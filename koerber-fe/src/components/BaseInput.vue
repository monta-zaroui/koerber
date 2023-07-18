<template>
  <div class="base-text-input">
    <input v-model="inputValue" :type="type" :placeholder="placeholder" @input="handleInput" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
  type: string;
  placeholder: string;
}
withDefaults(defineProps<IProps>(), {
  type: 'text',
  placeholder: ''
});

const inputValue = ref('');
const emit = defineEmits(['update:modelValue']);
function handleInput(event: Event) {
  const newValue = (event.target as HTMLInputElement).value;
  inputValue.value = newValue;
  emit('update:modelValue', newValue);
}
</script>

<style lang="scss" scoped>
.base-text-input {
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
}
</style>
