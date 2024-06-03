<template>
  <img
    :src="imageLink"
    class="h-8 rounded-3xl object-contain"
    alt="User profile image"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
const imageLink = ref("https://cdn.cdnlogo.com/logos/f/45/freepik.svg");
</script>
