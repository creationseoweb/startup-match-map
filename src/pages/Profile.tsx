
import { useParams } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById } = useUser();
  const navigate = useNavigate();
  
  const user = getUserById(id || '');
  
  if (!user) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
          <ArrowLeft size={16} /> Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="outline" 
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProfileCard user={user} />
        </div>
        
        <div className="space-y-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium mb-2">Contact Information</h3>
            <p className="text-sm text-muted-foreground mb-1">
              This information is only visible to users you've connected with.
            </p>
            <Button variant="default" className="w-full">
              Connect to View
            </Button>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium mb-2">Availability</h3>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-full inline-flex items-center">
              Available for meetings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
