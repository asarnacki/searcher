<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillSearchTerm"
      type="text"
      class="border-color-brand-gray-1 h-12 w-full rounded border-solid p-3 text-base shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();

const skillSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});
</script>
