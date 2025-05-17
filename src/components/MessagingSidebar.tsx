
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquare, X } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { FounderUser } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MessagingSidebarProps {
  show: boolean;
  onClose: () => void;
  onUserSelect: (user: FounderUser) => void;
}

const MessagingSidebar = ({ show, onClose, onUserSelect }: MessagingSidebarProps) => {
  const { allExceptCurrent } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock conversation data
  const conversations = allExceptCurrent.slice(0, 3).map(user => ({
    userId: user.id,
    name: user.name,
    avatar: user.avatar,
    lastMessage: 'Hi there! I saw your profile and...',
    time: '2h ago',
    unread: Math.floor(Math.random() * 3)
  }));
  
  // Filter users based on search term
  const filteredUsers = allExceptCurrent.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.startupName && user.startupName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-medium flex items-center gap-1">
            <MessageSquare size={18} /> Messages
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        
        <Tabs defaultValue="conversations" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 mx-4 my-2">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="founders">Founders</TabsTrigger>
          </TabsList>
          
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="conversations" className="flex-1 overflow-y-auto p-0 m-0">
            {conversations.length > 0 ? (
              <div className="divide-y divide-border">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.userId}
                    className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center gap-3"
                    onClick={() => onUserSelect(allExceptCurrent.find(u => u.id === conversation.userId)!)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground shrink-0">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="bg-primary text-primary-foreground h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">No conversations yet</h3>
                <p className="text-sm text-muted-foreground">Connect with founders to start messaging</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="founders" className="flex-1 overflow-y-auto p-0 m-0">
            <div className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center gap-3"
                  onClick={() => onUserSelect(user)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-sm">{user.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.startupName || user.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MessagingSidebar;
