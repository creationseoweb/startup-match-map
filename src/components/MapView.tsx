
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from '@/context/UserContext';
import { FounderUser } from '@/types';
import ProfileCard from './ProfileCard';

interface MapViewProps {
  onUserSelect?: (user: FounderUser) => void;
}

// Function to create custom marker icons
const createCustomIcon = (role: string, isPulsing: boolean = false): L.DivIcon => {
  const roleColor = getRoleColor(role);
  
  const className = `marker-${role}${isPulsing ? ' pulse-animation' : ''}`;
  
  return L.divIcon({
    className: className,
    html: `<div style="
      background-color: ${roleColor}; 
      border: 2px solid white;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 0 2px rgba(0,0,0,0.1);"
    ></div>`,
    iconSize: isPulsing ? [32, 32] : [24, 24], // Larger markers for better visibility
    iconAnchor: isPulsing ? [16, 16] : [12, 12],
  });
};

// Helper function to get color based on role
const getRoleColor = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'developer':
      return '#3b82f6'; // blue-500
    case 'designer':
      return '#ec4899'; // pink-500
    case 'business':
      return '#10b981'; // emerald-500
    case 'marketing':
      return '#f59e0b'; // amber-500
    default:
      return '#6366f1'; // indigo-500
  }
};

// Component to automatically fly to user location
const FlyToUserLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(position, 3, { 
      duration: 1.5
    });
  }, [map, position]);
  
  return null;
};

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

  // Get the position for the map center (use current user or default)
  const getInitialCenter = (): [number, number] => {
    if (currentUser?.location) {
      return [currentUser.location.latitude, currentUser.location.longitude];
    }
    return [20, 0]; // Default to a global view
  };

  useEffect(() => {
    console.log("MapView mounted, initializing map");
    
    // Force re-render to ensure the map container is properly sized
    const timer = setTimeout(() => {
      console.log("Setting mapReady to true");
      setMapReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    console.log("Map not ready yet, rendering placeholder");
    return <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <style>
        {`
          .leaflet-container {
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            70% {
              box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 240px;
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
          }
          
          .leaflet-popup-tip {
            background-color: #fff;
          }
          
          .marker-container {
            cursor: pointer;
          }
        `}
      </style>
      
      <MapContainer
        center={getInitialCenter()}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add zoom control to top-right */}
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control-zoom leaflet-bar leaflet-control">
            <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in">+</a>
            <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out">−</a>
          </div>
        </div>
        
        {/* Current user marker with pulse animation */}
        {currentUser?.location && (
          <>
            <Marker
              position={[currentUser.location.latitude, currentUser.location.longitude]}
              icon={createCustomIcon(currentUser.role, true)}
            />
            <FlyToUserLocation position={[currentUser.location.latitude, currentUser.location.longitude]} />
          </>
        )}
        
        {/* Other users markers */}
        {allExceptCurrent.map((user) => 
          user.location ? (
            <Marker
              key={user.id}
              position={[user.location.latitude, user.location.longitude]}
              icon={createCustomIcon(user.role)}
              eventHandlers={{
                click: () => handleMarkerClick(user),
              }}
            >
              {selectedUser?.id === user.id && (
                <Popup closeButton={true} autoClose={false} className="custom-popup">
                  <div className="w-full">
                    <ProfileCard user={user} compact />
                  </div>
                </Popup>
              )}
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
