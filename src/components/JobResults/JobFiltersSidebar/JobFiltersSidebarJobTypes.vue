<template>
  <collapsible-accordion header="Job types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const selectedJobTypes = ref([]);

const jobStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);

const userStore = useUserStore();
const route = useRoute();
const selectJobType = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
  route.push({ name: "JobResults" });
};
</script>
