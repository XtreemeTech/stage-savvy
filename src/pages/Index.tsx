import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BarChart3, Mail, Shield, Zap, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-muted/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PRISM
            </span>
          </div>
          <Link to="/auth">
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            Customer Relationship Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Crystal Clear
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Customer Management
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PRISM refracts your customer data into actionable insights. 
            Manage leads, track opportunities, and automate communications with precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to manage customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PRISM provides all the essential tools to nurture leads, track progress, and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Pipeline Management</CardTitle>
              <CardDescription>
                Visual Kanban board with drag-and-drop functionality to track leads through your sales pipeline.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Real-time insights into conversion rates, pipeline health, and revenue forecasting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email Automation</CardTitle>
              <CardDescription>
                Automated email sequences triggered by pipeline stage changes to nurture leads effectively.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Enterprise-grade security with row-level security policies to protect your customer data.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built with modern technology stack for instant page loads and real-time updates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Smart Insights</CardTitle>
              <CardDescription>
                AI-powered analytics to identify patterns and opportunities in your customer data.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your customer management?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using PRISM to streamline their sales process and boost revenue.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted/40 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                PRISM
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PRISM CRM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
