
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Search } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMessagesClick: () => void;
}

const Header = ({ onMessagesClick }: HeaderProps) => {
  const { currentUser } = useUser();

  const getInitials = (name: string) => {
    return name?.split(' ').map(part => part[0]).join('').toUpperCase() || 'U';
  };

  return (
    <header className="border-b border-border px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-primary">CoFounderMap</h1>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Beta
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 relative max-w-md w-full mx-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by name, location, skills..." 
            className="pl-10 bg-background" 
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative" onClick={onMessagesClick}>
            <MessageSquare size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>{getInitials(currentUser?.name || 'User')}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser?.startupName || 'Complete your profile'}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
