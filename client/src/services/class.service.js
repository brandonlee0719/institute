import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";


class Class {
  getClass(id) {
    return axios
      .get(`${API_BASE}/getClass/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateClassCompletion(data) {
    return axios
      .post(`${API_BASE}/updateClassCompletion`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new Class();
