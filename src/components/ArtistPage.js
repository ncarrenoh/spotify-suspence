import React from 'react';
import { fetchArtist, fetchArtists, fetchTopTracks } from "../api/spotify";
import { MdOutlinePlayArrow, MdOutlinePause } from 'react-icons/md';
import Header from '../shared/components/Header';
import Avatar from '../shared/components/Avatar';

const ArtistPage = ({ id, ...props }) => {
  const [tracks, setTracks] = React.useState([]);
  const [artist, setArtist] = React.useState({});
  const [currentTrack, setCurrentTrack] = React.useState(null);

  // const [isPlaying, setIsPlaying] = React.useState({});
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    getTracks();
    getArtist();
  }, []);


  const getTracks = async () => {
    const res = await fetchTopTracks(id);
    setTracks(res.tracks);
  };

  const getArtist = async () => {
    const res = await fetchArtist(id);
    console.log('res', res);
    setArtist(res);
  }

  const renderArtistDetails = () => {
    return (
      <>
        <Avatar src={artist.images[0].url} />
        <h2>{artist.name}</h2>
      </>  
    )
  }

  const handlePlay = (track) => {
    if (currentTrack && currentTrack.id === track.id && currentTrack.isPlaying) {
      audioRef.current.pause();
      setCurrentTrack(state => ({ ...state, isPlaying: !state.isPlaying }));
    } else if (currentTrack && currentTrack.id === track.id && !currentTrack.isPlaying) { 
      audioRef.current.play();
      setCurrentTrack(state => ({ ...state, isPlaying: !state.isPlaying }));
    } else if (currentTrack && currentTrack.id !== track.id) {
      audioRef.current.pause();
      audioRef.current = null;
      let audio = new Audio(track.preview_url);

      audio.onloadeddata = () => {
        audioRef.current = audio;
        audioRef.current.play();
        setCurrentTrack({ ...track, isPlaying: true });
        console.log('here 1');
        // setCurrentTrack(state => { console.log(state); return { ...state, isPlaying: !state.isPlaying } });
      }
    } else{
      let audio = new Audio(track.preview_url);
      audio.onloadeddata = () => {
        console.log('here');
        // setCurrentTrack(state => { console.log(state); return { ...state, isPlaying: !state.isPlaying } });
        audioRef.current = audio;
        audioRef.current.play();
        setCurrentTrack({ ...track, isPlaying: true });
      }
    }
  }

  console.log('is playing', currentTrack); 
  return (
    <div className="container">
      <Header />
      <div className='center' style={{ marginTop: '2rem' }}>
        {Object.keys(artist).length > 0 && renderArtistDetails()}
      </div>
      <h3 style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>Top Tracks</h3>
      <ul>
        {tracks.length > 0 && tracks.slice(0, 4).map(track => {
          return (
            <li key={track.id} style={{  borderBottom: '1px solid #eee', maxWidth: '90%' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', margin: '1rem', paddingLeft: '0.5rem', alignItems: 'center' }}>
                <audio src={track.previewUrl} ref={audioRef}></audio>
                <button style={{ border: '0', backgroundColor: 'transparent', cursor: 'pointer' }}  onClick={() => handlePlay(track)}>
                  {currentTrack && currentTrack.id === track.id && currentTrack.isPlaying ? <MdOutlinePause color='#aaa' size='2rem' /> : <MdOutlinePlayArrow color='#aaa' size='2rem' />}
                </button>
                <span style={{ fontWeight: 'bold', fontSize: '13px', textAlign: 'justify', paddingLeft: '1rem' }}>{track.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <h3 className="center">Albums</h3>

    </div>
  );
};

export default ArtistPage;