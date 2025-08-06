-- Fix critical RLS policy vulnerabilities
-- Update customers table policies to be user-specific

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Authenticated users can update customers" ON public.customers;
DROP POLICY IF EXISTS "Authenticated users can delete customers" ON public.customers;

-- Create secure user-specific policies for customers
CREATE POLICY "Users can view their own customers" 
ON public.customers 
FOR SELECT 
USING (auth.uid() = created_by);

CREATE POLICY "Users can update their own customers" 
ON public.customers 
FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own customers" 
ON public.customers 
FOR DELETE 
USING (auth.uid() = created_by);

-- Fix email_logs table - add missing UPDATE/DELETE policies
CREATE POLICY "Users can update their own email logs" 
ON public.email_logs 
FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own email logs" 
ON public.email_logs 
FOR DELETE 
USING (auth.uid() = created_by);

-- Update email_logs SELECT policy to be user-specific
DROP POLICY IF EXISTS "Authenticated users can view all email logs" ON public.email_logs;
CREATE POLICY "Users can view their own email logs" 
ON public.email_logs 
FOR SELECT 
USING (auth.uid() = created_by);

-- Optimize OTP expiry settings
ALTER TABLE auth.sessions SET SCHEMA auth;
UPDATE auth.config SET 
  "OTP_EXPIRY" = 3600, -- 1 hour instead of default 24 hours
  "OTP_LENGTH" = 6;    -- Standard 6-digit OTP