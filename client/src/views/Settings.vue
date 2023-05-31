<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form @submit.prevent="send" class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="email"
              class="input input-bordered"
              :value="username"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Current Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">New Password</span>
            </label>
            <input
              type="password"
              name="new_password"
              placeholder="password"
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { socket } from "../socket";
  import auth from "../auth";
  import { computed } from "vue";

  export default {
    name: "Settings",
    data() {
      return {
        username: computed(() => this.$store.state.user),
        index: "",
      };
    },
    mounted() {
      auth.getUser(this.username).then((res) => {
        this.index = res.data.index;
        console.log(res);
      });
    },
    methods: {
      async send(e) {
        auth
          .setChanges({
            username: e.target.username.value,
            password: e.target.password.value,
            new_password: e.target.new_password.value,
            index: this.index,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("user", res.data.user);
            this.$store.commit("updateUser");
            this.$router.push({ name: "Dashboard" });
          });
      },
    },
  };
</script>

<style scoped></style>
