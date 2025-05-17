
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FounderUser, Industry, Skill } from '@/types';
import { MapPin, MessageSquare, User, Users, Globe } from 'lucide-react';
import { industryOptions, skillOptions, stageOptions } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  user: FounderUser;
  compact?: boolean;
  onMessageClick?: (userId: string) => void;
}

const ProfileCard = ({ user, compact = false, onMessageClick }: ProfileCardProps) => {
  // Helper to get full label from option value
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

  if (compact) {
    return (
      <Card className="w-full border-none shadow-none">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{user.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs">
                <MapPin size={12} />
                {user.location?.city || 'Global'}, {user.location?.country}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="mb-2">
            <div className="flex gap-1 mb-1">
              <Badge variant="outline" className="text-xs capitalize bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200">
                {user.role}
              </Badge>
              {user.startupName && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200">
                  {getStageLabel(user.startupStage || 'idea')}
                </Badge>
              )}
            </div>
            {user.startupName && (
              <div className="text-sm font-medium">{user.startupName}</div>
            )}
          </div>
          <div className="flex gap-1 flex-wrap mt-2">
            {user.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {getSkillLabel(skill)}
              </Badge>
            ))}
            {user.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{user.skills.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="default" size="sm" className="w-full" onClick={() => onMessageClick?.(user.id)}>
            <MessageSquare size={14} className="mr-1" /> Connect
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin size={14} />
              {user.location?.city || 'Global'}, {user.location?.country}
            </CardDescription>
            <div className="flex gap-1 mt-1">
              <Badge variant="outline" className="capitalize bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200">
                {user.role}
              </Badge>
              {user.startupStage && (
                <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200">
                  {getStageLabel(user.startupStage)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.startupName && (
          <div>
            <h3 className="font-medium text-lg">{user.startupName}</h3>
            <p className="text-muted-foreground">{user.startupDescription}</p>
          </div>
        )}
        
        <div>
          <h4 className="font-medium mb-1 flex items-center gap-1">
            <User size={16} /> Bio
          </h4>
          <p className="text-sm">{user.bio}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <Users size={16} /> Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="mb-1">
                  {getSkillLabel(skill)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <Globe size={16} /> Industries
            </h4>
            <div className="flex flex-wrap gap-1">
              {user.industries.map((industry) => (
                <Badge key={industry} variant="outline" className="mb-1">
                  {getIndustryLabel(industry)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Looking For</h4>
          <div className="flex flex-wrap gap-1">
            {user.lookingFor.map((skill) => (
              <Badge key={skill} variant="default" className="mb-1 bg-primary/80">
                {getSkillLabel(skill)}
              </Badge>
            ))}
          </div>
        </div>
        
        {(user.website || user.linkedIn || user.twitter || user.github) && (
          <div>
            <h4 className="font-medium mb-1">Links</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline flex items-center gap-1">
                  <Globe size={14} /> Website
                </a>
              )}
              {user.linkedIn && (
                <a href={`https://linkedin.com/in/${user.linkedIn}`} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline">LinkedIn</a>
              )}
              {user.twitter && (
                <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline">Twitter</a>
              )}
              {user.github && (
                <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline">GitHub</a>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link to={`/profile/${user.id}`}>View Profile</Link>
        </Button>
        <Button onClick={() => onMessageClick?.(user.id)}>
          <MessageSquare size={16} className="mr-2" /> Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
