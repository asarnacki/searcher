<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="ogranization in UNIQUE_ORGANIZATIONS"
            :key="ogranization"
            class="h-8 w-1/2"
          >
            <input
              :id="ogranization"
              v-model="selectedOrganizations"
              :value="ogranization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="ogranization">{{ ogranization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const selectedOrganizations = ref([]);

const jobStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
const router = useRouter();

const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: "JobResults" });
};
</script>
