import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signUpSchema, signInSchema, sanitizeInput } from '@/lib/validation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const {
    signIn,
    signUp,
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate and sanitize input
      const sanitizedData = {
        email: email.toLowerCase().trim(),
        password: password
      };
      const validatedData = signInSchema.parse(sanitizedData);
      const {
        error
      } = await signIn(validatedData.email, validatedData.password);
      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          toast({
            title: "Sign in failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message || 'Failed to sign in',
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully."
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign in failed",
          description: "An error occurred during signin",
          variant: "destructive"
        });
      }
    }
    setLoading(false);
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate and sanitize input
      const sanitizedData = {
        email: email.toLowerCase().trim(),
        password: password,
        fullName: sanitizeInput(fullName)
      };
      const validatedData = signUpSchema.parse(sanitizedData);
      const {
        error
      } = await signUp(validatedData.email, validatedData.password, validatedData.fullName);
      if (error) {
        if (error.message?.includes('already registered') || error.code === 'user_already_exists') {
          toast({
            title: "Sign up failed",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive"
          });
        } else if (error.code === 'profile_creation_failed') {
          toast({
            title: "Account creation issue",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message || 'Failed to create account',
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account created!",
          description: "Welcome to PRISM CRM. Please check your email to verify your account."
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign up failed",
          description: "An error occurred during signup",
          variant: "destructive"
        });
      }
    }
    setLoading(false);
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* PRISM Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <h1 className="text-3xl font-mono-heading font-bold tracking-tight">PRISM</h1>
            </div>
          </div>
          <p className="text-sm font-body text-muted-foreground">Customer Relationship Management</p>
        </div>

        <Card className="border-muted/40 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-mono-heading text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center font-body">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </> : 'Login'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </> : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;