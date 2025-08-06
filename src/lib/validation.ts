import { z } from 'zod';

// Customer validation schema
export const customerSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  phone: z.string()
    .optional()
    .refine((phone) => !phone || /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, '')), {
      message: 'Please enter a valid phone number'
    }),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .trim()
    .optional(),
  opportunity_value: z.number()
    .min(0, 'Opportunity value cannot be negative')
    .max(999999999, 'Opportunity value is too large')
    .optional(),
  notes: z.string()
    .max(2000, 'Notes must be less than 2000 characters')
    .trim()
    .optional(),
  pipeline_stage: z.enum(['new', 'in_talks', 'closed'])
});

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .trim()
});

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

// Sanitization helper
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};