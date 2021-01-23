import axios from "axios";

const baseUrl = "http://localhost:8080";

export const getSalutiData = () => {
  return axios.get(`${baseUrl}/api/saluti`);
};
export const getSalutiDataParam = (name) => {
  return axios.get(`${baseUrl}/api/saluti/${name}`);
};
