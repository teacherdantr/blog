// src/app/(auth)/actions.ts
'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), // Basic check, real validation happens on server
});

interface ActionResult {
    success: boolean;
    error?: string;
}


export async function handleLogin(formData: z.infer<typeof loginSchema>): Promise<ActionResult> {
  try {
    // Validate input on the server side as well
    const validatedData = loginSchema.safeParse(formData);
    if (!validatedData.success) {
      console.error("Server-side validation failed:", validatedData.error.errors);
      return { success: false, error: 'Invalid input data.' };
    }

    const { email, password } = validatedData.data;

    console.log("Attempting login for:", email);

    // --- Mock Authentication Logic ---
    // Replace this with your actual authentication check (e.g., against a database)
    // IMPORTANT: Never store passwords in plain text. Use hashing (e.g., bcrypt).
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    if (email === 'admin@example.com' && password === 'password') {
      console.log("Login successful for:", email);
      // --- Mock JWT Generation ---
      // In a real app, generate a secure JWT token here
      const mockJwtToken = 'valid-token'; // Placeholder

      // Set HttpOnly cookie
      cookies().set('session_token', mockJwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 60 * 60 * 24 * 7, // Example: 1 week expiry
        path: '/', // Make cookie available across the site
        sameSite: 'lax', // Mitigate CSRF
      });

      return { success: true };
    } else {
      console.log("Login failed for:", email, "Incorrect credentials.");
      return { success: false, error: 'Invalid email or password.' };
    }
  } catch (error) {
    console.error('Login action error:', error);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}

export async function handleLogout(): Promise<ActionResult> {
    try {
        console.log("Attempting logout");
        // Clear the session cookie
        cookies().delete('session_token');
        console.log("Logout successful, cookie deleted.");
        return { success: true };
    } catch (error) {
        console.error('Logout action error:', error);
        return { success: false, error: 'An unexpected server error occurred during logout.' };
    }
}
