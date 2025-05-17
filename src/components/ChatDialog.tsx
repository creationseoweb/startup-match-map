
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { X, SendHorizontal } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { FounderUser } from '@/types';

interface ChatDialogProps {
  user: FounderUser;
  onClose: () => void;
}

const ChatDialog = ({ user, onClose }: ChatDialogProps) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState('');

  // Mock conversation data for demo
  const mockMessages = [
    {
      id: '1',
      senderId: user.id,
      content: `Hi there! I saw your profile and I'm impressed with your work on ${currentUser?.startupName || 'your startup'}. Would love to connect!`,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '2',
      senderId: currentUser?.id || 'current',
      content: "Thanks for reaching out! I'd be happy to chat more about potential collaboration opportunities.",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000) // 23 hours ago
    },
    {
      id: '3',
      senderId: user.id,
      content: "Great! I'm particularly interested in your experience with product development. Do you have time for a quick call this week?",
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000) // 22 hours ago
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to an API
      console.log('Sending message to', user.name, ':', message);
      setMessage('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-card border border-border rounded-lg shadow-lg flex flex-col z-20" style={{ height: '500px' }}>
      <div className="p-3 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">{user.name}</h3>
            <p className="text-xs text-muted-foreground">
              {user.location?.city}, {user.location?.country}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map(msg => {
          const isCurrentUser = msg.senderId === currentUser?.id;
          return (
            <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} px-3 py-2 rounded-lg`}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-3 border-t border-border flex gap-2 items-center">
        <Input 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <SendHorizontal size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatDialog;
