<script setup lang="ts">
import BaseInput from "./components/BaseInput.vue";
import { ref } from "vue";

const username = ref('');
</script>

<template>
  <BaseInput v-model="username" placeholder="Enter your username" />
</template>
