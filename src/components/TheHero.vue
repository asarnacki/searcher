<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1 border border-blue-600">1 col</div>

        <div class="col-span-5 col-start-2 border border-blue-600">
          <the-headline />
        </div>

        <div class="col-span-5 col-start-7 border border-blue-600">5 cols</div>
        <div class="col-span-1 col-start-12 border border-blue-600">1 cols</div>
      </div>
    </section>
  </main>
</template>

<script>
import TheHeadline from "@/components/TheHeadline.vue";
export default {
  name: "TheHero",
  components: {
    TheHeadline,
  },
};
</script>
