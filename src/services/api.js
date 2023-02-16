import axios from 'axios';

//Base da URL: https://api.jikan.moe/v4/

const jikanApi = axios.create({
  baseURL: 'https://api.jikan.moe/v4/',
});

export default jikanApi;
