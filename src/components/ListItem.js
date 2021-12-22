import { Link } from "@reach/router";
import Avatar from "../shared/components/Avatar";

export default function ListItem({ item: artist, ...props }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <li>
        <div className='list_item'>
          <Avatar src={artist.images[0].url} />
          <span style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '13px', textAlign: 'right' }}>{artist.name}</span>
        </div>
      </li>
    </Link>
  );
}