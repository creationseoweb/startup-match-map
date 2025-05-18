import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit3, MapPin, Briefcase, Calendar, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { industryOptions, skillOptions, stageOptions } from '@/data/mockData';
import { Skill, Industry } from '@/types';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MyProfile = () => {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
      </div>
    );
  }

  // Helper functions
  const getIndustryLabel = (value: Industry) => {
    return industryOptions.find(option => option.value === value)?.label || value;
  };

  const getSkillLabel = (value: Skill) => {
    return skillOptions.find(option => option.value === value)?.label || value;
  };

  const getStageLabel = (stage: string) => {
    return stageOptions.find(option => option.value === stage)?.label || stage;
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  
  // Create custom marker icon for user's location
  const createUserMarkerIcon = () => {
    const roleColor = getRoleColor(currentUser.role);
    
    return L.divIcon({
      className: `marker-${currentUser.role} pulse-animation`,
      html: `<div style="
        background-color: ${roleColor}; 
        border: 2px solid white;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.1);"
      ></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Basic Profile Information */}
          <Card>
            <CardHeader className="relative">
              <div className="absolute right-6 top-6">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit3 size={16} /> Edit Profile
                </Button>
              </div>
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-2xl">{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {currentUser.location?.city || 'Global'}, {currentUser.location?.country}
                  </CardDescription>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="outline" className="capitalize bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200">
                      {currentUser.role}
                    </Badge>
                    {currentUser.startupStage && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200">
                        {getStageLabel(currentUser.startupStage)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentUser.bio && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Bio</h3>
                  <p>{currentUser.bio}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{getSkillLabel(skill)}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Industries</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.industries.map((industry) => (
                      <Badge key={industry} variant="outline">{getIndustryLabel(industry)}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Startup Information Card */}
          {currentUser.startupName && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase size={18} /> Startup Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{currentUser.startupName}</h3>
                  <p className="text-muted-foreground">{currentUser.startupDescription}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Looking For</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentUser.lookingFor.map((skill) => (
                      <Badge key={skill} variant="default" className="bg-primary/80">
                        {getSkillLabel(skill)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Map Card with Leaflet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={18} /> My Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                {currentUser.location && (
                  <>
                    <style>
                      {`
                        .leaflet-container {
                          width: 100%;
                          height: 100%;
                        }
                        
                        .pulse-animation {
                          animation: pulse 2s infinite;
                        }
                        
                        @keyframes pulse {
                          0% {
                            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                          }
                          70% {
                            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
                          }
                          100% {
                            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
                          }
                        }
                      `}
                    </style>
                    <MapContainer
                      center={[currentUser.location.latitude, currentUser.location.longitude]}
                      zoom={10}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[currentUser.location.latitude, currentUser.location.longitude]}
                        icon={createUserMarkerIcon()}
                      />
                    </MapContainer>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Location</h3>
                <p className="flex items-center gap-1">
                  <MapPin size={14} /> 
                  {currentUser.location?.city}, {currentUser.location?.state} {currentUser.location?.country}
                </p>
              </div>
              
              {(currentUser.website || currentUser.linkedIn || currentUser.twitter || currentUser.github) && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Links</h3>
                  <div className="space-y-2">
                    {currentUser.website && (
                      <a href={currentUser.website} target="_blank" rel="noopener noreferrer" 
                        className="text-primary hover:underline flex items-center gap-2">
                        <Link size={14} /> Website
                      </a>
                    )}
                    {currentUser.linkedIn && (
                      <a href={`https://linkedin.com/in/${currentUser.linkedIn}`} target="_blank" rel="noopener noreferrer" 
                        className="text-primary hover:underline flex items-center gap-2">
                        <Link size={14} /> LinkedIn
                      </a>
                    )}
                    {currentUser.twitter && (
                      <a href={`https://twitter.com/${currentUser.twitter}`} target="_blank" rel="noopener noreferrer" 
                        className="text-primary hover:underline flex items-center gap-2">
                        <Link size={14} /> Twitter
                      </a>
                    )}
                    {currentUser.github && (
                      <a href={`https://github.com/${currentUser.github}`} target="_blank" rel="noopener noreferrer" 
                        className="text-primary hover:underline flex items-center gap-2">
                        <Link size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Availability Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-full inline-flex items-center">
                Available for meetings
              </div>
            </CardContent>
          </Card>
          
          {/* Account Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="privacy">Profile Privacy</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Public
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label htmlFor="joined">Joined</Label>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} /> May 2025
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
