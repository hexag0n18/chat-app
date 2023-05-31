import { createApp } from "vue";
import { Store } from "vuex";
import { createRouter, createWebHashHistory } from "vue-router";
// import VueSocketIo from "vue-socket.io";
// import SocketIo from "socket.io-client";

import "./assets/main.css";

// Importing views
import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue";
import Chat from "./views/Chat.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import NotFound from "./views/NotFound.vue";
import { socket } from "./socket";
import { connect } from "socket.io-client";

// Creating the store of vuex
const store = new Store({
  state: {
    user: localStorage.getItem("user"),
    auth: sessionStorage.getItem("token") ? true : false,
    connectedUsers: [],
    connected: false,
  },
  mutations: {
    doLogin(state, user) {
      state.auth = true;
      state.user = user;
    },
    doLogout(state) {
      state.auth = false;
      state.user = null;
    },
    updateUsersList(state, userList) {
      state.connectedUsers = userList;
    },
    openConnection(state) {
      state.connected = true;
    },
    closeConnection(state) {
      state.connected = false;
    },
  },
  actions: {
    doLogin({ commit }, user) {
      commit("doLogin", user);
    },
    doLogout({ commit }) {
      commit("doLogout");
    },
    doUpdate({ commit }, response) {},
  },
  getters: {
    isLoggedIn(state) {
      return !!state.auth;
    },
  },
});

// Setting the routes
const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    meta: {
      authRequired: true,
    },
  },
  {
    name: "Chat",
    path: "/chat",
    component: Chat,
    meta: {
      authRequired: true,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  // Route for any page
  { name: "NotFound", path: "/:pathMatch(.*)*", component: NotFound },
];

// Creating the router
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// let socketConnection = false;
// Verifying what routes need auth and what are guest routes
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (store.state.auth) {
      socket.connect();
      if (!store.state.connected) {
        socket.emit("login", store.state.user);
        store.commit("openConnection");
      }
      next();
    } else next({ name: "Login" });
    socket.on("user login", (user) => {
      console.log(user);
      store.commit("updateUsersList", user.userList);
    });
    socket.on("user logout", (user) => {
      console.log(user);
      store.commit("updateUsersList", user.userList);
    });
  } else if (to.matched.some((record) => record.meta.guest))
    if (store.state.auth) next({ name: "Dashboard" });
    else next();
  else next();
});

// Setting up the App
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
