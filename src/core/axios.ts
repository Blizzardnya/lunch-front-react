import axios from "axios";

const api = axios.create({
  timeout: 5 * 60 * 1000,
  baseURL: "https://lunch-back.herokuapp.com/",
});

export default api;
