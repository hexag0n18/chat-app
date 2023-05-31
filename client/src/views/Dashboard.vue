<template>
  <div>
    <h1>Dashboard</h1>
    <p>Hello</p>
    <button class="btn btn-accent" @click="logout">Button</button>
  </div>
</template>

<script>
  export default {
    name: "Dashboard",
    methods: {
      async logout() {
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
        this.$store.dispatch("doLogout");
        this.$router.push({ name: "Login" });
      },
    },
  };
</script>

<style scoped></style>
