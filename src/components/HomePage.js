import React from 'react';
import './HomePage.css';
import { fetchArtists, fetchArtist } from '../api/spotify';
import { artistIDS } from '../data/artists-ids';
import LocalStorage from '../config/localStorage';

import ListItem from './ListItem';

const storage = new LocalStorage('spotify-artist');

export default function HomePage() {
  const [artists, setArtists] = React.useState([]);
  React.useEffect(() => {
    addArtistsToState();
  }, []);

  const addArtistsToState = async () => {
    let savedArtists = await storage.get();
    if (!savedArtists) {
      return Promise.all(artistIDS.map(id => {
        return fetchArtist(id).then(data => {
          setArtists(prevArtists => [...prevArtists, data]);
        })
      })).catch(err => console.error(err)).finally(storage.add(artists));
    }
    setArtists(savedArtists);
  };

  console.log('artists', artists);
  return (
    <div className='container'>
      <ul>
        {artists.length > 0
          && artists.map(artist => <ListItem item={artist} key={artist.name} />)}
      </ul>
    </div>
  );
}