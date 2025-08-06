import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  LayoutDashboard, 
  List, 
  BarChart3, 
  LogOut, 
  User
} from 'lucide-react';

interface SidebarProps {
  currentView: 'kanban' | 'list' | 'metrics';
  onViewChange: (view: 'kanban' | 'list' | 'metrics') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    { id: 'kanban', label: 'Pipeline', icon: LayoutDashboard },
    { id: 'list', label: 'Customers', icon: List },
    { id: 'metrics', label: 'Analytics', icon: BarChart3 },
  ] as const;

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* PRISM Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PRISM
            </h1>
            <p className="text-xs text-muted-foreground">Customer Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Separator />

      {/* User Profile & Sign Out */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.email}
            </p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};