import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  pipeline_stage: 'new' | 'in_talks' | 'closed';
  opportunity_value?: number;
  created_at: string;
  stage_updated_at: string;
}

interface Metrics {
  totalCustomers: number;
  conversionRate: number;
  totalRevenue: number;
  averageDealSize: number;
  averageTimeInPipeline: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];

export const MetricsDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalCustomers: 0,
    conversionRate: 0,
    totalRevenue: 0,
    averageDealSize: 0,
    averageTimeInPipeline: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, pipeline_stage, opportunity_value, created_at, stage_updated_at');

      if (error) throw error;

      const customers = data || [];
      setCustomers(customers);
      calculateMetrics(customers);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (customers: Customer[]) => {
    const totalCustomers = customers.length;
    const closedCustomers = customers.filter(c => c.pipeline_stage === 'closed');
    const conversionRate = totalCustomers > 0 ? (closedCustomers.length / totalCustomers) * 100 : 0;
    
    const totalRevenue = closedCustomers.reduce((sum, customer) => 
      sum + (customer.opportunity_value || 0), 0
    );
    
    const averageDealSize = closedCustomers.length > 0 
      ? totalRevenue / closedCustomers.length 
      : 0;

    // Calculate average time in pipeline (days)
    const averageTimeInPipeline = customers.length > 0 
      ? customers.reduce((sum, customer) => {
          const created = new Date(customer.created_at);
          const updated = new Date(customer.stage_updated_at);
          const diffTime = Math.abs(updated.getTime() - created.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return sum + diffDays;
        }, 0) / customers.length
      : 0;

    setMetrics({
      totalCustomers,
      conversionRate,
      totalRevenue,
      averageDealSize,
      averageTimeInPipeline,
    });
  };

  const getPipelineData = () => {
    const stages = ['new', 'in_talks', 'closed'];
    return stages.map(stage => {
      const count = customers.filter(c => c.pipeline_stage === stage).length;
      return {
        name: stage === 'new' ? 'New' : stage === 'in_talks' ? 'In Talks' : 'Closed',
        value: count,
        percentage: customers.length > 0 ? ((count / customers.length) * 100).toFixed(1) : 0
      };
    });
  };

  const getMonthlyData = () => {
    const monthlyStats: Record<string, { month: string; customers: number; revenue: number }> = {};
    
    customers.forEach(customer => {
      const month = new Date(customer.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      
      if (!monthlyStats[month]) {
        monthlyStats[month] = { month, customers: 0, revenue: 0 };
      }
      
      monthlyStats[month].customers += 1;
      if (customer.pipeline_stage === 'closed') {
        monthlyStats[month].revenue += customer.opportunity_value || 0;
      }
    });

    return Object.values(monthlyStats).sort((a, b) => 
      new Date(a.month).getTime() - new Date(b.month).getTime()
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin mx-auto rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 bg-background overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your sales performance and customer insights</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
            <Badge variant="secondary" className="mt-1">All time</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate.toFixed(1)}%</div>
            <Badge variant={metrics.conversionRate > 20 ? "default" : "secondary"} className="mt-1">
              {metrics.conversionRate > 20 ? "Good" : "Needs improvement"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <Badge variant="default" className="mt-1">Closed deals</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.averageDealSize.toLocaleString()}</div>
            <Badge variant="secondary" className="mt-1">Per closed deal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time in Pipeline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.averageTimeInPipeline)}</div>
            <Badge variant="secondary" className="mt-1">Days</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
            <CardDescription>Customer distribution across pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getPipelineData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPipelineData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Customer acquisition and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="hsl(var(--primary))" name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};