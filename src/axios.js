import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';

const httpClient = {
    axios: axios
}

export default httpClient;