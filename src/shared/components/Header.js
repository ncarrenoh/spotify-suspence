import logo from '../../spotify.png';

export default function Headers({ background }) {
  return (
    <div style={{ backgroundColor: background || 'white', borderBottom: '1px solid #ddd', padding: 5, marginLeft: 10 }}>
      <img src={logo} alt="logo" width='35px' height='35px' color='red' />
    </div>
  )
}