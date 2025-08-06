import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { KanbanBoard } from '@/components/dashboard/KanbanBoard';
import { CustomerList } from '@/components/dashboard/CustomerList';
import { MetricsDashboard } from '@/components/dashboard/MetricsDashboard';
import { Loader2 } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'metrics';

const Dashboard = () => {
  const { loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('kanban');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading PRISM...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'kanban':
        return <KanbanBoard />;
      case 'list':
        return <CustomerList />;
      case 'metrics':
        return <MetricsDashboard />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;