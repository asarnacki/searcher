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

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { mapActions, mapState } from "pinia";
import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },

  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
