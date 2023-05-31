<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Sign up now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="register">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              class="input input-bordered"
            />
            <label class="label">
              <router-link
                :to="{ name: 'Login' }"
                class="label-text-alt link link-hover"
                >Already registered?</router-link
              >
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Image</span>
            </label>
            <input
              type="file"
              name="image"
              class="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from "@/auth";

  export default {
    name: "Register",
    methods: {
      async register(e) {
        const formdata = new FormData(e.target); // Setting a form data
        // console.log(formdata.get("username"));
        await auth
          .register(formdata)
          .then((response) => {
            // console.log(response);
            this.$router.push({ name: "Login" }); // redirect to login route
          })
          .catch((error) => console.log(error));
      },
    },
  };
</script>
