<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import apiClient from "@/api/axiosConfig";
import type { ApiResponse, Spotlight } from "@/api/types";

const spotlights = ref<Spotlight[]>([]);

const getSpotlights = async () => {
  const response = await apiClient.get<ApiResponse>("/");
  spotlights.value = response.data.record.spotlights;
};

onMounted(getSpotlights);
</script>
