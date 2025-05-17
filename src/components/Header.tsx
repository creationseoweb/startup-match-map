
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMessagesClick: () => void;
}

const Header = ({ onMessagesClick }: HeaderProps) => {
  const { currentUser } = useUser();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="font-bold text-xl mr-6">CofounderMatch</Link>
        
        <div className="flex-1"></div>
        
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" onClick={onMessagesClick}>
            <MessageSquare />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell />
          </Button>
          
          <Link to="/my-profile">
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {currentUser && (
                  <>
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                  </>
                )}
                {!currentUser && (
                  <>
                    <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
                  </>
                )}
              </Avatar>
              <span className="hidden md:inline">My Profile</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
