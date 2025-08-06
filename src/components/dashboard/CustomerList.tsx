import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Mail, Phone, Building, DollarSign } from 'lucide-react';
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

const stageColors = {
  new: 'bg-blue-500',
  in_talks: 'bg-yellow-500',
  closed: 'bg-green-500',
};

const stageLabels = {
  new: 'New',
  in_talks: 'In Talks',
  closed: 'Closed',
};

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, stageFilter]);

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

  const filterCustomers = () => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stageFilter !== 'all') {
      filtered = filtered.filter(customer => customer.pipeline_stage === stageFilter);
    }

    setFilteredCustomers(filtered);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
          <h1 className="text-2xl font-bold">Customer List</h1>
          <p className="text-muted-foreground">View and manage all your customers</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_talks">In Talks</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEditCustomer(customer)}
                >
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div>{customer.name}</div>
                      {customer.phone && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.company ? (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {customer.company}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <div 
                        className={`h-2 w-2 rounded-full ${stageColors[customer.pipeline_stage]}`}
                      />
                      {stageLabels[customer.pipeline_stage]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {customer.opportunity_value && customer.opportunity_value > 0 ? (
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        ${customer.opportunity_value.toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(customer.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || stageFilter !== 'all' 
                  ? 'No customers match your filters' 
                  : 'No customers yet'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <CustomerModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        customer={editingCustomer}
      />
    </div>
  );
};