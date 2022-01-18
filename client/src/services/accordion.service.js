import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class AccordionMenu {
  getAccordian() {
    return axios
      .get(`${API_BASE}/accordian`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getAccordionClassdata(id) {
    return axios
      .get(`${API_BASE}/classAccordionData/${id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new AccordionMenu();
