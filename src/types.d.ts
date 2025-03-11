import React from 'react';

declare module 'framer-motion' {
  export const motion: any;
}

declare module '@clerk/nextjs' {
  export const ClerkProvider: React.FC<{ children: React.ReactNode }>;
  export const SignInButton: React.FC<{ mode?: string; children: React.ReactNode }>;
  export const SignUpButton: React.FC<{ mode?: string; children: React.ReactNode }>;
  export const SignedIn: React.FC<{ children: React.ReactNode }>;
  export const SignedOut: React.FC<{ children: React.ReactNode }>;
  export const UserButton: React.FC<{ afterSignOutUrl?: string; appearance?: any }>;
  export const clerkMiddleware: () => any;
} 