import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class EmailService {
  sendEmail(data) {
    return axios
      .post(`${API_BASE}/sendEmail/`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new EmailService();
