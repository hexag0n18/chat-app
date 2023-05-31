import axios from "axios";

const API_URL = "http://localhost:3000/";

// Axios requests
export default {
  // Send the new user to api
  register(formdata) {
    // const urlEncoded = new URLSearchParams(formdata).toString();
    return axios.post(API_URL + "auth/register", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // Logging in as a user
  login(email, password) {
    const user = { email, password };
    return axios.post(API_URL + "auth/login", user);
  },
  async getUser(user) {
    return await axios.post(
      API_URL + "api/user",
      { user },
      {
        headers: { "x-access-token": sessionStorage.getItem("token") },
      }
    );
  },
  async setChanges(data) {
    return await axios.post(API_URL + "api/edit", data, {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    });
  },
  // async verifyToken() {
  //   let response = await axios.get(API_URL + "verify", {
  //     headers: {
  //       "x-access-token": sessionStorage.getItem("token"),
  //     },
  //   });
  //   return response.data;
  // },
};
