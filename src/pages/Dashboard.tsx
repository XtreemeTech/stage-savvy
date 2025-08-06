import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { KanbanBoard } from '@/components/dashboard/KanbanBoard';
import { CustomerList } from '@/components/dashboard/CustomerList';
import { MetricsDashboard } from '@/components/dashboard/MetricsDashboard';

type ViewType = 'kanban' | 'list' | 'metrics';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');

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