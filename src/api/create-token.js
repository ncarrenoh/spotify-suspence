import axios from 'axios';
import oauth from 'axios-oauth-client';

const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET } = process.env;

const authOpts = {
  url: 'https://accounts.spotify.com/api/token',
  client_id: REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: REACT_APP_SPOTIFY_CLIENT_SECRET,
  grant_type: 'client_credentials'
};

export const getClientCredentials = oauth.client(axios.create(), authOpts);