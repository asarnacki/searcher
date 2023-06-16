<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="Test" type="checkbox" class="mr-3" />
            <label for="Test">Test</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Placeholder" type="checkbox" class="mr-3" />
            <label for="Placeholder">Placeholder</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Job111" type="checkbox" class="mr-3" />
            <label for="Job111">Job111</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="VueTube" type="checkbox" class="mr-3" />
            <label for="VueTube">VueTube</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { CollapsibleAccordion },
};
</script>
