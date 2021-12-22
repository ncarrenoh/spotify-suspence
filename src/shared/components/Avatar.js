import React from 'react';
export default function Avatar({className, width, src, height, alt, ...props}) {
  return (
    <img className={`avatar ${className}`} src={src} width={width} height={height} alt={alt} />
  )
}

Avatar.defaultProps = {
  width: '100px',
  height: '100px',
  alt: 'avatar-img',
  src: '',
}