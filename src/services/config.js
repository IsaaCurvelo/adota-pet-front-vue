import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:6969/',
  headers: {
    Authorization: 'Bearer {token}'
  }
})