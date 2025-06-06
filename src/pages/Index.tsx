
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import { FounderUser } from '@/types';
import ProfileCard from '@/components/ProfileCard';
import MessagingSidebar from '@/components/MessagingSidebar';
import ChatDialog from '@/components/ChatDialog';
import FilterSidebar from '@/components/FilterSidebar';
import ListView from '@/components/ListView';
import { Filter, Map, Users } from 'lucide-react';

const Index = () => {
  const [selectedUser, setSelectedUser] = useState<FounderUser | null>(null);
  const [showMessagingSidebar, setShowMessagingSidebar] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [chatUser, setChatUser] = useState<FounderUser | null>(null);
  
  const handleUserSelect = (user: FounderUser) => {
    setSelectedUser(user);
    setShowMessagingSidebar(false);
  };
  
  const handleMessageUser = (user: FounderUser) => {
    setChatUser(user);
    setShowMessagingSidebar(false);
  };
  
  const handleMessagingClick = () => {
    setShowMessagingSidebar(true);
    setShowFilterSidebar(false);
  };
  
  const handleFilterClick = () => {
    setShowFilterSidebar(true);
    setShowMessagingSidebar(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMessagesClick={handleMessagingClick} />
      
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-1 flex md:flex-row flex-col h-full">
          <Tabs defaultValue="map" className="flex-1 flex flex-col h-full">
            <div className="px-4 pt-4 flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <Map size={16} /> Map View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1">
                  <Users size={16} /> List View
                </TabsTrigger>
              </TabsList>
              
              <Button onClick={handleFilterClick} variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} /> Filters
              </Button>
            </div>
            
            <TabsContent value="map" className="flex-1 p-4 pt-2 h-full">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <MapView onUserSelect={handleUserSelect} />
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="flex-1 p-4 pt-0 overflow-auto">
              <ListView 
                onUserSelect={handleUserSelect} 
                onMessageClick={handleMessageUser}
              />
            </TabsContent>
          </Tabs>
          
          {/* Selected user profile panel - make it smaller to give more space to map */}
          {selectedUser && (
            <div className="w-80 border-l border-border p-4 overflow-y-auto animate-fade-in hidden md:block">
              <ProfileCard 
                user={selectedUser} 
                onMessageClick={() => handleMessageUser(selectedUser)} 
              />
            </div>
          )}
        </div>
      </main>
      
      {/* Overlays and sidebars */}
      <MessagingSidebar 
        show={showMessagingSidebar} 
        onClose={() => setShowMessagingSidebar(false)}
        onUserSelect={handleMessageUser}
      />
      
      <FilterSidebar
        show={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
      />
      
      {chatUser && (
        <ChatDialog 
          user={chatUser} 
          onClose={() => setChatUser(null)} 
        />
      )}
    </div>
  );
};

export default Index;
