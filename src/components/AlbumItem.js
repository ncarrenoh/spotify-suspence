import React from 'react';
import './AlbumItem.css';
const AlbumItem = ({ src, alt, width, height }) => {
  return (
    <div>
      <img src={src} alt={alt} className="album__item" width={width} height={height} />
    </div>
  )
}

export default AlbumItem;