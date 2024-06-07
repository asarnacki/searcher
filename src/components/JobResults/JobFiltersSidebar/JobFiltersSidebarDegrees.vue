<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useDegreesStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const degreesStore = useDegreesStore();

const UNIQUE_JOB_TYPES = computed(() => degreesStore.UNIQUE_DEGREES);
</script>
