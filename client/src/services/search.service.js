import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Search {
  searchModule(data) {
    return axios
      .post(`${API_BASE}/searchModule`, data, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new Search();
