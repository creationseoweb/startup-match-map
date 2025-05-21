
import { UserRole } from "@/types";

interface MapLegendProps {
  className?: string;
}

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

const MapLegend = ({ className = "" }: MapLegendProps) => {
  const roles: UserRole[] = ['founder', 'investor', 'advisor'];
  
  return (
    <div className={`absolute bottom-3 left-3 map-legend ${className}`}>
      <div className="font-medium mb-1">User Types</div>
      
      {/* Show standard roles */}
      {roles.map(role => (
        <div key={role} className="legend-item">
          <div 
            className="legend-color" 
            style={{ backgroundColor: getRoleColor(role) }}
          ></div>
          <span className="capitalize">{role}</span>
        </div>
      ))}
      
      {/* Show other common roles */}
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
    </div>
  );
};

export default MapLegend;
