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
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";
export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    displayedJobs() {
      const firstJobIndex = (this.currentPage - 1) * 10;
      const lastJobIndex = this.currentPage * 10;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },

    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },

    nextPage() {
      const nextPage = this.currentPage + 1;
      const lastPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= lastPage ? nextPage : undefined;
    },

    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${baseUrl}/jobs`);
    this.jobs = response.data;
  },
};
</script>
