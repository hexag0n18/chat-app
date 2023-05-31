<template>
  <div class="flex flex-col w-full">
    <div class="container mx-auto">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            Public chatroom
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <div class="card-actions justify-end">
            <router-link
              :to="{ name: 'Chat' }"
              class="btn btn-active btn-sm btn-primary"
              >Enter</router-link
            >
            <div class="badge badge-outline">connected</div>
          </div>
        </div>
      </div>
      <button class="btn btn-accent" @click="logout">Log Out</button>
    </div>
    <div class="divider"></div>
    <div class="overflow-x-auto w-auto mx-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Users into app</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="user in connectedUsers">
            <td>
              <div class="flex items-center space-x-3 w-full">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      src="@/assets/default.svg"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ user }}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { socket } from "../socket";

  export default {
    name: "Dashboard",
    computed: {
      ...mapState(["connectedUsers"]),
    },
    methods: {
      async logout() {
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
        this.$store.dispatch("doLogout");
        // socket.emit("logout");
        this.$store.commit("closeConnection");
        socket.disconnect();
        this.$router.push({ name: "Login" });
      },
    },
  };
</script>

<style scoped></style>
