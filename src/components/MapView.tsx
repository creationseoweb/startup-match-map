import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from '@/context/UserContext';
import { FounderUser } from '@/types';
import MapMarker from './map/MapMarker';
import MapLegend from './map/MapLegend';
import { initializeLeafletIcons, getInitialCenter } from './map/MapUtils';
import './map/mapStyles.css';

interface MapViewProps {
  onUserSelect?: (user: FounderUser) => void;
}

const MapView = ({ onUserSelect }: MapViewProps) => {
  const { allExceptCurrent, currentUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<FounderUser | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const handleMarkerClick = (user: FounderUser) => {
    setSelectedUser(user);
    
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  useEffect(() => {
    console.log("MapView mounted, initializing map");
    
    // Initialize Leaflet icon settings
    initializeLeafletIcons();
    
    // Force re-render to ensure the map container is properly sized
    const timer = setTimeout(() => {
      console.log("Setting mapReady to true");
      setMapReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    console.log("Map not ready yet, rendering placeholder");
    return <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  // Get the center coordinates for the map
  const centerPosition = getInitialCenter(
    currentUser?.location?.latitude,
    currentUser?.location?.longitude
  );

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={centerPosition}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add zoom control at top-right corner */}
        <ZoomControl position="topright" />
        
        {/* Current user marker with pulse animation */}
        {currentUser?.location && (
          <MapMarker 
            user={currentUser}
            isPulsing={true}
            onClick={handleMarkerClick}
          />
        )}
        
        {/* Other users markers */}
        {allExceptCurrent.map((user) => 
          user.location ? (
            <MapMarker 
              key={user.id}
              user={user}
              onClick={handleMarkerClick}
            />
          ) : null
        )}
      </MapContainer>
      
      {/* Map legend */}
      <MapLegend />
    </div>
  );
};

export default MapView;
