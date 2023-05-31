<template>
  <div class="p-4 h-screen w-screen">
    <div class="mockup-window h-full border bg-base-300">
      <div
        class="hero h-full w-full bg-base-200 overflow-auto flex flex-col items-around"
      >
        <div
          id="content"
          class="hero-content relative w-full text-center flex flex-col pb-20"
        ></div>
        <input
          type="text"
          placeholder="Type here"
          class="fixed bottom-5 input input-bordered input-error w-1/2"
          @keyup.enter="send"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import auth from "@/auth";
  import { socket } from "../socket";
  import { computed } from "vue";

  export default {
    name: "Chat",
    data() {
      return {
        inChatRoom: computed(() => this.$store.state.inChatRoom),
        user: computed(() => this.$store.state.user),
      };
    },
    mounted() {
      if (!this.inChatRoom) {
        socket.emit("join");
        socket.on("new message", (data) => {
          let $div = document.createElement("div");
          $div.classList.add("chat", "chat-start", "w-full");
          $div.innerHTML = `
            <div class="chat-header">${data.username}</div>
            <div class="chat-bubble chat-bubble-primary break-words text-left">
              ${data.message}
            </div>`;
          document.getElementById("content").appendChild($div);
        });
      }
    },
    unmounted() {
      socket.emit("us leave");
      this.$store.commit("quitChatRoom");
    },
    methods: {
      send(e) {
        const message = e.target.value;
        if (message.length > 0) {
          socket.emit("new message", message);
          let $div = document.createElement("div");
          $div.classList.add("chat", "chat-end", "w-full");
          $div.innerHTML = `
            <div class="chat-header">${this.user}</div>
            <div class="chat-bubble chat-bubble-secondary break-words text-left">
              ${message}
            </div>`;
          document.getElementById("content").appendChild($div);
          e.target.value = "";
        }
      },
    },
  };
</script>
