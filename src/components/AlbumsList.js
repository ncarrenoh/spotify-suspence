import React from 'react';
import AlbumItem from './AlbumItem';
import './AlbumsList.css'
const FlatList = ({ data, renderItems, horizontal = false, ...props }) => {
  if (!data && !data.length) {
    return null;
  } 
  return (
    <div className={horizontal ? 'row' : 'column'}>
      {
        data.map((item, index) => {
          return (
            <div className={horizontal ? 'row' : 'column'}>
              {renderItems(item, index)}
            </div>
          );
        })
      }
    </div>
  )
}

export default function AlbumsList({ albums, ...props }) {
  // const [albums, setAlbums] = useState([]);

  // useEffect(() => {
  //   fetchAlbums();
  // }, []);

  // const getAlbumsById = async () => {
  //   const data = fetchAlbums() 
  // } 

  return (
    <FlatList
      data={albums.slice(0, 4)}
      horizontal
      renderItems={(item, index) => <AlbumItem key={index.toString()} src={item.images[0].url} width={item.images[0].width * 0.3} height={item.images[0].height * 0.3} alt={item.name} />}
    />
  )
}