import axios from "axios";

const server = "http://localhost:5071";
const baseUrl = "/api/clienti";

export const getAllClientiData = () => {
  return axios.get(`${server}${baseUrl}/cerca/all`);
};

export const getClientiByCode = (codfid) => {
  return axios.get(`${server}${baseUrl}/cerca/codice/${codfid}`);
};

export const delClientiByCode = (codfid) => {
  return axios.delete(`${server}${baseUrl}/elimina/codfid/${codfid}`);
};

{
  /*
class ClientiService {
  state = {
    server: "http://localhost:5071",
    baseUrl: "/api/clienti",
  };

  getAllClientiData = () => {
    return axios.get(`${this.state.server}${this.state.baseUrl}/cerca/all`);
  };

  getClientiByCoddfidData = (codfid) => {
    return axios.get(
      `${this.state.server}${this.state.baseUrl}/cerca/codice/${codfid}`
    );
  };
}

export default new ClientiService();
*/
}
