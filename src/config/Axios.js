import Axios from 'axios';
import LocalStorage from './localStorage';
const storage = new LocalStorage('spotify-token');
const accessToken = storage.get();

export const axios = Axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*'
  }
});