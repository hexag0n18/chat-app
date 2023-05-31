<template>
  <div class="p-4 h-screen w-screen">
    <div class="mockup-window h-full border bg-base-300">
      <div class="hero h-full bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="md:text-[200px] max-[768px]:text-9xl font-bold">404</h1>
            <kbd class="kbd kbd-lg md:text-4xl">not</kbd>
            &nbsp;
            <kbd class="kbd kbd-lg md:text-4xl">found</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from "@/auth";

  export default {
    name: "NotFound",
    methods: {},
  };
</script>
