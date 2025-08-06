import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Phone, Building, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CustomerModal } from './CustomerModal';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  pipeline_stage: 'new' | 'in_talks' | 'closed';
  opportunity_value?: number;
  notes?: string;
  created_at: string;
}

const stages = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-500' },
  { id: 'in_talks', title: 'In Talks', color: 'bg-yellow-500' },
  { id: 'closed', title: 'Closed', color: 'bg-green-500' },
] as const;

export const KanbanBoard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerStage = async (customerId: string, newStage: 'new' | 'in_talks' | 'closed') => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({ 
          pipeline_stage: newStage,
          stage_updated_at: new Date().toISOString()
        })
        .eq('id', customerId);

      if (error) throw error;

      setCustomers(prev => 
        prev.map(customer => 
          customer.id === customerId 
            ? { ...customer, pipeline_stage: newStage }
            : customer
        )
      );

      toast({
        title: "Stage updated",
        description: `Customer moved to ${stages.find(s => s.id === newStage)?.title}`,
      });
    } catch (error) {
      console.error('Error updating customer stage:', error);
      toast({
        title: "Error",
        description: "Failed to update customer stage",
        variant: "destructive",
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateCustomerStage(draggableId, destination.droppableId as 'new' | 'in_talks' | 'closed');
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  const getCustomersByStage = (stageId: string) => {
    return customers.filter(customer => customer.pipeline_stage === stageId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin mx-auto rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Pipeline</h1>
          <p className="text-muted-foreground">Manage your leads through the sales process</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {stages.map(stage => (
            <div key={stage.id} className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                <h2 className="font-semibold">{stage.title}</h2>
                <Badge variant="secondary">
                  {getCustomersByStage(stage.id).length}
                </Badge>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-3 p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'bg-muted/50' : ''
                    }`}
                  >
                    {getCustomersByStage(stage.id).map((customer, index) => (
                      <Draggable key={customer.id} draggableId={customer.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">
                                {customer.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{customer.email}</span>
                              </div>
                              {customer.phone && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  <span>{customer.phone}</span>
                                </div>
                              )}
                              {customer.company && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Building className="h-3 w-3" />
                                  <span className="truncate">{customer.company}</span>
                                </div>
                              )}
                              {customer.opportunity_value && customer.opportunity_value > 0 && (
                                <div className="flex items-center gap-2 text-xs font-medium">
                                  <DollarSign className="h-3 w-3" />
                                  <span>${customer.opportunity_value.toLocaleString()}</span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <CustomerModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        customer={editingCustomer}
      />
    </div>
  );
};