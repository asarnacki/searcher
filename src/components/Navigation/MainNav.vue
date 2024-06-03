<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >G-Searcher
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="item in menuItems"
              :key="item.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="item.url"
                class="flex h-full items-center py-2.5"
                >{{ item.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="userStore.isLoggedIn" />
          <action-button v-else text="Sign In" @click="userStore.loginUser" />
        </div>
      </div>
      <sub-nav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Life at company", url: "/" },
  { text: "Shop", url: "/" },
  { text: "Careers", url: "/jobs/results" },
  { text: "Contact", url: "/" },
]);

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const loginUser = userStore.loginUser;
const headerHeightClass = computed(() => ({
  "h-16": !isLoggedIn.value,
  "h-32": isLoggedIn.value,
}));
</script>
