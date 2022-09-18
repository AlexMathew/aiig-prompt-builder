import axios from "axios";

const BASE_URL = "https://api.twickr.live";

export default axios.create({
  baseURL: `${BASE_URL}/twickr/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
