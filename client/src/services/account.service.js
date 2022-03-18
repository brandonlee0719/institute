import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";


class Account {
  getAccountUser(id) {
    return axios
      .get(`${API_BASE}/accountUser/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateUser(data) {
    return axios.put(`${API_BASE}/updateAccountUser`, data, {
      headers: authHeader(),
    });
  }

  deleteUser(id) {
    return axios
      .delete(`${API_BASE}/deleteAccountUser/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res);
  }
}

export default new Account();
