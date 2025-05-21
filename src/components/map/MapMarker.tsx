
import { Marker, Popup } from 'react-leaflet';
import { FounderUser } from '@/types';
import ProfileCard from '../ProfileCard';
import { createCustomIcon } from './MapUtils';

interface MapMarkerProps {
  user: FounderUser;
  isPulsing?: boolean;
  onClick?: (user: FounderUser) => void;
}

const MapMarker = ({ user, isPulsing = false, onClick }: MapMarkerProps) => {
  if (!user.location) return null;
  
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <Marker
      key={user.id}
      position={[user.location.latitude, user.location.longitude]}
      icon={createCustomIcon(user.role, isPulsing)}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup closeButton={false} autoClose={false} className="custom-popup">
        <div className="w-full">
          <ProfileCard user={user} compact={true} />
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
