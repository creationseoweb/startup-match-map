
import L from 'leaflet';

// Helper function to get color based on role
export const getRoleColor = (role: string): string => {
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

// Function to create custom marker icons
export const createCustomIcon = (role: string, isPulsing: boolean = false): L.DivIcon => {
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

// Initialize Leaflet default icon paths (to be called once)
export const initializeLeafletIcons = (): void => {
  // Fix Leaflet's default icon paths
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// Get initial center coordinates for the map
export const getInitialCenter = (latitude?: number, longitude?: number): [number, number] => {
  if (latitude !== undefined && longitude !== undefined) {
    return [latitude, longitude];
  }
  return [20, 0]; // Default to a global view
};
