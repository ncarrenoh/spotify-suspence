import qs from 'qs';
import { axios } from '../config/Axios';
import LocalStorage from '../config/localStorage';
import { getClientCredentials } from './create-token';

export const fetchArtist = async (id = '') => {
  const storage = new LocalStorage('spotify-artist');
  let savedArtists = await storage.get();
  try {
    if (!id.length) {
      return {
        sucess: false,
        message: "you must provide an id"
      };
    }
    if (savedArtists) {
      let data = savedArtists.find(artist => artist.id === id);
      return data;
    }
    const res = await axios.get(`/artists/${id}`);
    return res.data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
}
export const fetchArtists = async (ids = []) => {
  try {
    if (!ids.length) {
      return {
        sucess: false,
        message: "you must provide an id"
      };
    }

    const res = await axios.get('/artists', {
      params: {
        ids,
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}
export const fetchTopTracks = async (id, force = false) => {
  const tokenStorage = new LocalStorage('spotify-token');
  const topTracksStorage = new LocalStorage('spotify-top-tracks');
  let topTracksSaved = await topTracksStorage.get();
  
  try {
    if (!topTracksSaved || force) {
      let res = await axios.get(`/artists/${id}/top-tracks?market=cl`);
      if (res.status === 200) {
        topTracksStorage.add({
          [id]: res.data.tracks, 
        });
        return res.data;
      }
      fetchTopTracks(id);
    } else {
      let res = topTracksSaved[id];
      if (!res) {
        fetchTopTracks(id, true);
      }
      return { tracks: res };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const auth = await getClientCredentials();
      const { access_token } = auth;
      await tokenStorage.add(access_token);
      fetchTopTracks(id);
    }
  }
}

export const fetchAlbums = async () => {
  try {
    
  } catch (error) {
    
  }
}