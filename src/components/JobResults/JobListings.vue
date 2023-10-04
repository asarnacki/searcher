<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />

      <div class="mx-auto mt-8">
        <div class="flex flex-row flex-nowrap">
          <p class="flex-grow text-sm">Page {{ currentPage }}</p>

          <div class="flex items-center justify-center">
            <router-link
              v-if="previousPage"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              :to="{ name: 'JobResults', query: { page: previousPage } }"
              role="link"
            >
              Previous
            </router-link>
            <router-link
              v-if="nextPage"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              :to="{ name: 'JobResults', query: { page: nextPage } }"
              role="link"
            >
              Next
            </router-link>
          </div>
        </div>
      </div>
    </ol>
  </main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import JobListing from "@/components/JobResults/JobListing.vue";
import {
  useJobsStore,
  FETCH_JOBS,
  FILTERED_JOBS_BY_ORGANIZATIONS,
} from "@/stores/jobs";

export default {
  name: "JobListings",
  components: { JobListing },
  computed: {
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },

    ...mapState(useJobsStore, {
      FILTERED_JOBS_BY_ORGANIZATIONS,
      displayedJobs() {
        const firstJobIndex = (this.currentPage - 1) * 10;
        const lastJobIndex = this.currentPage * 10;
        return this.FILTERED_JOBS_BY_ORGANIZATIONS.slice(
          firstJobIndex,
          lastJobIndex
        );
      },
      nextPage() {
        const nextPage = this.currentPage + 1;
        const lastPage = Math.ceil(
          this.FILTERED_JOBS_BY_ORGANIZATIONS.length / 10
        );
        return nextPage <= lastPage ? nextPage : undefined;
      },
    }),

    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },

  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
};
</script>
