
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import ProfileCard from '@/components/ProfileCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FounderUser } from '@/types';

interface ListViewProps {
  onUserSelect: (user: FounderUser) => void;
  onMessageClick: (user: FounderUser) => void;
}

const ListView = ({ onUserSelect, onMessageClick }: ListViewProps) => {
  const { allExceptCurrent } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter users based on search term
  const filteredUsers = allExceptCurrent.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.startupName && user.startupName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.location.city && user.location.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.location.country && user.location.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search founders by name, startup, or location..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className="cursor-pointer" 
                onClick={() => onUserSelect(user)}
              >
                <ProfileCard 
                  user={user} 
                  compact={true} 
                  onMessageClick={() => onMessageClick(user)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="text-lg font-medium">No founders found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
