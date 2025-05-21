
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
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
    iconSize: isPulsing ? [32, 32] : [24, 24],
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
    case 'founder':
      return '#8b5cf6'; // purple-500
    case 'advisor':
      return '#14b8a6'; // teal-500
    case 'investor':
      return '#f43f5e'; // rose-500
    default:
      return '#6366f1'; // indigo-500
  }
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
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Ensure Leaflet has proper icon images by fixing the icon paths
  useEffect(() => {
    // Fix Leaflet's default icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
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
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(139, 92, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
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
        
        /* Legend styles */
        .map-legend {
          background-color: white;
          padding: 8px;
          border-radius: 4px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.2);
          font-size: 12px;
          max-width: 200px;
          z-index: 1000;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 6px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        `}
      </style>
      
      <MapContainer
        center={getInitialCenter()}
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
          <Marker
            position={[currentUser.location.latitude, currentUser.location.longitude]}
            icon={createCustomIcon(currentUser.role, true)}
          >
            <Popup closeButton={false} autoClose={false} className="custom-popup">
              <div className="w-full">
                <ProfileCard user={currentUser} compact={true} />
              </div>
            </Popup>
          </Marker>
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
              <Popup closeButton={false} autoClose={false} className="custom-popup">
                <div className="w-full">
                  <ProfileCard user={user} compact={true} />
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
      
      {/* Map legend */}
      <div className="absolute bottom-3 left-3 map-legend">
        <div className="font-medium mb-1">User Types</div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('developer') }}></div>
          <span>Developer</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('designer') }}></div>
          <span>Designer</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('business') }}></div>
          <span>Business</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('marketing') }}></div>
          <span>Marketing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('founder') }}></div>
          <span>Founder</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: getRoleColor('investor') }}></div>
          <span>Investor</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
