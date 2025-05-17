
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FounderUser } from '@/types';
import { mockFounders } from '@/data/mockData';

interface UserContextType {
  currentUser: FounderUser | null;
  setCurrentUser: (user: FounderUser) => void;
  allUsers: FounderUser[];
  allExceptCurrent: FounderUser[];
  getUserById: (id: string) => FounderUser | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // For demo purposes, let's set a default mock user
  const [currentUser, setCurrentUser] = useState<FounderUser | null>(mockFounders[0]);
  
  // Get all users except the current one
  const allExceptCurrent = currentUser 
    ? mockFounders.filter(user => user.id !== currentUser.id) 
    : mockFounders;

  // Function to get a user by ID
  const getUserById = (id: string) => {
    return mockFounders.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      allUsers: mockFounders,
      allExceptCurrent,
      getUserById
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
