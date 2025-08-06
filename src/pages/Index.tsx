import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BarChart3, Mail, Shield, Zap, Sparkles, Star, CheckCircle, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-crystal.png';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
const Index = () => {
  const activeUsers = useCounterAnimation({
    end: 10000,
    suffix: '+'
  });
  const satisfactionRate = useCounterAnimation({
    end: 98,
    suffix: '%'
  });
  const leadsManaged = useCounterAnimation({
    end: 2500000
  });
  const conversionBoost = useCounterAnimation({
    end: 45,
    suffix: '%'
  });
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
      <section className="relative container mx-auto px-4 py-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large forest green gradient circle - top right */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          
          {/* Medium sage green ellipse - bottom left */}
          <div className="absolute -bottom-24 -left-24 w-80 h-64 bg-gradient-to-tr from-secondary/25 to-accent/20 rounded-full blur-2xl opacity-50"></div>
          
          {/* Small accent bubbles */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-accent/30 to-primary/20 rounded-full blur-xl opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-l from-primary/25 to-secondary/20 rounded-full blur-lg opacity-35"></div>
          
          {/* Organic blob shapes */}
          <div className="absolute top-1/2 left-1/4 w-48 h-36 bg-gradient-to-br from-accent/15 to-primary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl opacity-30 transform rotate-12"></div>
          <div className="absolute top-1/6 right-1/6 w-36 h-48 bg-gradient-to-tl from-secondary/20 to-accent/15 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] blur-xl opacity-25 transform -rotate-12"></div>
        </div>
        
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            
            <h1 className="text-5xl md:text-6xl font-body font-bold tracking-tight animate-fade-in">
              Crystal Clear
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mx-0 my-0 py-[15px]">
                Customer Management
              </span>
            </h1>
            <p className="text-xl font-body text-muted-foreground max-w-2xl lg:mx-0 mx-auto leading-relaxed animate-fade-in">
              PRISM refracts your customer data into actionable insights. 
              Manage leads, track opportunities, and automate communications with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto hover-scale">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover-scale">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="animate-fade-in lg:order-last order-first">
            <div className="relative">
              <img src={heroImage} alt="PRISM Crystal" className="rounded-2xl shadow-2xl hover-scale w-full h-auto max-w-lg mx-auto" />
              <div className="absolute -top-4 -right-4 text-white px-4 py-2 text-sm font-semibold animate-pulse shadow-lg bg-gradient-to-r from-primary to-secondary rounded-md">
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 border-y border-muted/20 bg-slate-100 rounded">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 animate-fade-in" ref={activeUsers.ref}>
            <div className="text-3xl font-numbers font-bold text-primary">{activeUsers.displayValue}</div>
            <div className="text-sm font-body text-muted-foreground">Active Users</div>
          </div>
          <div className="space-y-2 animate-fade-in" ref={satisfactionRate.ref}>
            <div className="text-3xl font-numbers font-bold text-primary">{satisfactionRate.displayValue}</div>
            <div className="text-sm font-body text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="space-y-2 animate-fade-in" ref={leadsManaged.ref}>
            <div className="text-3xl font-numbers font-bold text-primary">{leadsManaged.displayValue}</div>
            <div className="text-sm font-body text-muted-foreground">Leads Managed</div>
          </div>
          <div className="space-y-2 animate-fade-in" ref={conversionBoost.ref}>
            <div className="text-3xl font-numbers font-bold text-primary">{conversionBoost.displayValue}</div>
            <div className="text-sm font-body text-muted-foreground">Conversion Boost</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono-heading font-bold mb-4">
            Everything you need to manage customers
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            PRISM provides all the essential tools to nurture leads, track progress, and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Pipeline Management</CardTitle>
              <CardDescription className="font-body">
                Visual Kanban board with drag-and-drop functionality to track leads through your sales pipeline.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <BarChart3 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Analytics Dashboard</CardTitle>
              <CardDescription className="font-body">
                Real-time insights into conversion rates, pipeline health, and revenue forecasting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Email Automation</CardTitle>
              <CardDescription className="font-body">
                Automated email sequences triggered by pipeline stage changes to nurture leads effectively.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Shield className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Secure & Private</CardTitle>
              <CardDescription className="font-body">
                Enterprise-grade security with row-level security policies to protect your customer data.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Zap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Lightning Fast</CardTitle>
              <CardDescription className="font-body">
                Built with modern technology stack for instant page loads and real-time updates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-muted/40 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-lg group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300 font-mono-heading">Smart Insights</CardTitle>
              <CardDescription className="font-body">
                AI-powered analytics to identify patterns and opportunities in your customer data.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-mono-heading font-bold mb-4">Trusted by thousands of businesses</h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            See what our customers say about their experience with PRISM CRM.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover-scale transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />)}
              </div>
              <p className="font-body text-muted-foreground mb-4">
                "PRISM transformed our sales process completely. We've seen a 40% increase in conversions since switching."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">JS</span>
                </div>
                <div>
                  <div className="font-semibold">John Smith</div>
                  <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />)}
              </div>
              <p className="font-body text-muted-foreground mb-4">
                "The automation features save us hours every week. The interface is intuitive and powerful."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">MJ</span>
                </div>
                <div>
                  <div className="font-semibold">Maria Johnson</div>
                  <div className="text-sm text-muted-foreground">Sales Director, GrowthCo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />)}
              </div>
              <p className="font-body text-muted-foreground mb-4">
                "Best CRM we've ever used. The analytics help us make data-driven decisions every day."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">DB</span>
                </div>
                <div>
                  <div className="font-semibold">David Brown</div>
                  <div className="text-sm text-muted-foreground">VP Sales, InnovateLtd</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-mono-heading font-bold mb-6">Why businesses choose PRISM</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-mono-heading font-semibold mb-2">Increase Conversion Rates</h3>
                  <p className="font-body text-muted-foreground">Advanced analytics and automation help identify and nurture your best prospects.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-mono-heading font-semibold mb-2">Save Time & Resources</h3>
                  <p className="font-body text-muted-foreground">Automated workflows and smart insights reduce manual work by up to 60%.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-mono-heading font-semibold mb-2">Scale Efficiently</h3>
                  <p className="font-body text-muted-foreground">Handle 10x more leads without increasing your team size.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-center space-y-4">
                <TrendingUp className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-2xl font-mono-heading font-bold">Average Results</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-numbers font-bold text-primary">45%</div>
                    <div className="text-sm font-body text-muted-foreground">More Conversions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-numbers font-bold text-primary">60%</div>
                    <div className="text-sm font-body text-muted-foreground">Time Saved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-numbers font-bold text-primary">10x</div>
                    <div className="text-sm font-body text-muted-foreground">Lead Capacity</div>
                  </div>
                  <div>
                    <div className="text-3xl font-numbers font-bold text-primary">98%</div>
                    <div className="text-sm font-body text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          <CardContent className="p-12 text-center relative z-10">
            <h2 className="text-3xl font-mono-heading font-bold mb-4">
              Ready to transform your customer management?
            </h2>
            <p className="text-lg font-body opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using PRISM to streamline their sales process and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 hover-scale">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/20 text-white bg-slate-600 hover:bg-slate-500">
                Schedule Demo
              </Button>
            </div>
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
              © 2025 PRISM CRM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;