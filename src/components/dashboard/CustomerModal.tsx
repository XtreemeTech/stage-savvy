import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { customerSchema, sanitizeInput } from '@/lib/validation';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  pipeline_stage: 'new' | 'in_talks' | 'closed';
  opportunity_value?: number;
  notes?: string;
}

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    pipeline_stage: 'new' as 'new' | 'in_talks' | 'closed',
    opportunity_value: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        company: customer.company || '',
        pipeline_stage: customer.pipeline_stage,
        opportunity_value: customer.opportunity_value?.toString() || '',
        notes: customer.notes || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        pipeline_stage: 'new',
        opportunity_value: '',
        notes: '',
      });
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      // Validate and sanitize input data
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
        company: formData.company ? sanitizeInput(formData.company) : undefined,
        pipeline_stage: formData.pipeline_stage,
        opportunity_value: formData.opportunity_value ? parseFloat(formData.opportunity_value) : 0,
        notes: formData.notes ? sanitizeInput(formData.notes) : undefined,
      };

      // Validate with Zod schema
      const validatedData = customerSchema.parse(sanitizedData);

      const customerData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        pipeline_stage: validatedData.pipeline_stage,
        opportunity_value: validatedData.opportunity_value || null,
        notes: validatedData.notes || null,
        created_by: user.id,
      };

      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update(customerData)
          .eq('id', customer.id);

        if (error) throw error;

        toast({
          title: "Customer updated",
          description: "Customer information has been updated successfully.",
        });
      } else {
        // Create new customer
        const { error } = await supabase
          .from('customers')
          .insert([customerData]);

        if (error) throw error;

        toast({
          title: "Customer added",
          description: "New customer has been added to your pipeline.",
        });
      }

      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        console.error('Error saving customer:', error);
        toast({
          title: "Error",
          description: "Failed to save customer information",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!customer) return;

    setDeleteLoading(true);
    
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id);

      if (error) throw error;

      toast({
        title: "Customer deleted",
        description: "Customer has been removed from your pipeline.",
      });
      
      onClose();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </DialogTitle>
          <DialogDescription>
            {customer 
              ? 'Update customer information and pipeline stage.'
              : 'Add a new customer to your sales pipeline.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Customer name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="customer@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Pipeline Stage</Label>
              <Select
                value={formData.pipeline_stage}
                onValueChange={(value) => handleInputChange('pipeline_stage', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_talks">In Talks</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Opportunity Value ($)</Label>
              <Input
                id="value"
                type="number"
                min="0"
                step="0.01"
                value={formData.opportunity_value}
                onChange={(e) => handleInputChange('opportunity_value', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any additional notes about this customer..."
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <div>
              {customer && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" type="button" disabled={deleteLoading}>
                      {deleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this customer? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {customer ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  customer ? 'Update Customer' : 'Add Customer'
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};