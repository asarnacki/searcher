<template>
  <img
    :src="imageLink"
    class="h-8 rounded-3xl object-contain"
    alt="User profile image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink: "https://cdn.cdnlogo.com/logos/f/45/freepik.svg",
    };
  },
};
</script>
