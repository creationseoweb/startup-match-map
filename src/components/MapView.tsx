
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useUser } from '@/context/UserContext';
import { FounderUser } from '@/types';
import ProfileCard from './ProfileCard';

// Temporary Mapbox token for development - in production, use environment variables
// This would be replaced with an API key form in production
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xnYnptbHFxMDI3dTNkcGRraHFxaXQ1eCJ9.r6ycVk6fXBzCYvk1k5_6vA';

// Tell TypeScript to trust us that the token will be available at runtime
mapboxgl.accessToken = MAPBOX_TOKEN || '';

interface MapViewProps {
  onUserSelect?: (user: FounderUser) => void;
}

const MapView = ({ onUserSelect }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  
  const { allExceptCurrent, currentUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<FounderUser | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20], // Start with a global view
      zoom: 1.5,
      projection: 'globe',
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add globe atmosphere and effects
    map.current.on('style.load', () => {
      if (!map.current) return;
      
      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');
      
      map.current.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers when users data changes
  useEffect(() => {
    if (!map.current || !currentUser) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Create a marker for the current user with a different style
    if (currentUser.location) {
      const el = document.createElement('div');
      el.className = `marker-${currentUser.role} pulse-animation border-2 border-white`;
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
      el.style.animation = 'pulse-light 2s infinite';

      const currentUserMarker = new mapboxgl.Marker(el)
        .setLngLat([currentUser.location.longitude, currentUser.location.latitude])
        .addTo(map.current);

      markersRef.current[currentUser.id] = currentUserMarker;

      // Center map on current user
      map.current.flyTo({
        center: [currentUser.location.longitude, currentUser.location.latitude],
        zoom: 3,
        duration: 2000
      });
    }

    // Add markers for other users
    allExceptCurrent.forEach(user => {
      if (!user.location) return;
      
      // Create marker element
      const el = document.createElement('div');
      el.className = `marker-${user.role}`;
      
      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([user.location.longitude, user.location.latitude])
        .addTo(map.current!);
      
      // Store reference to marker for later cleanup
      markersRef.current[user.id] = marker;
      
      // Add click handler
      marker.getElement().addEventListener('click', () => {
        // Remove any existing popup
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
        
        setSelectedUser(user);
        
        // Create popup for this user
        const popupNode = document.createElement('div');
        popupNode.className = 'popup-container';
        
        // Create popup and add to map
        popupRef.current = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([user.location.longitude, user.location.latitude])
          .setDOMContent(popupNode)
          .addTo(map.current!);
        
        // When popup is closed, reset selected user
        popupRef.current.on('close', () => {
          setSelectedUser(null);
          popupRef.current = null;
        });
        
        // Notify parent if callback is provided
        if (onUserSelect) {
          onUserSelect(user);
        }
      });
    });
  }, [allExceptCurrent, currentUser, onUserSelect]);

  // Render selected user popup content when selectedUser changes
  useEffect(() => {
    if (!popupRef.current || !selectedUser) return;

    const popupNode = popupRef.current.getElement().querySelector('.popup-container');
    if (!popupNode) return;

    // Clear existing content
    while (popupNode.firstChild) {
      popupNode.removeChild(popupNode.firstChild);
    }

    // Render mini profile card in popup
    const root = createRoot(popupNode);
    root.render(
      <ProfileCard user={selectedUser} compact />
    );
  }, [selectedUser]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
          <div className="max-w-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Mapbox API Key Required</h3>
            <p className="mb-4">To use the map functionality, please enter a valid Mapbox API key.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to create React roots for popups
function createRoot(container: Element) {
  // This is a simplified version as we don't have ReactDOM.createRoot
  return {
    render: (component: React.ReactNode) => {
      // In a real implementation, we would use ReactDOM.createRoot
      // For the prototype, we'll create a placeholder
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="w-72 p-4">
          <div class="text-center font-medium">User Profile Card</div>
          <p class="text-sm text-gray-500">This would render a React component in production</p>
        </div>
      `;
      container.appendChild(div);
    }
  };
}

export default MapView;
