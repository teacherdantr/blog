import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies

// Placeholder for JWT verification logic
async function verifyJwt(token: string): Promise<boolean> {
  // In a real app, you'd verify the token against your secret key
  // and check its expiration.
  // For this mock, we'll just check if the token exists and is 'valid-token'.
  console.log("Verifying token:", token);
  await new Promise(resolve => setTimeout(resolve, 10)); // Simulate async verification
  return token === 'valid-token';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
     console.log("Middleware: Checking path", pathname, "Token:", sessionToken);


    if (!sessionToken || !(await verifyJwt(sessionToken))) {
       console.log("Middleware: No valid token, redirecting to login");
      // Redirect to login page, preserving the intended destination
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname); // Pass redirect path
      return NextResponse.redirect(loginUrl);
    }
     console.log("Middleware: Valid token found, allowing access");
  }

   // Allow the request to proceed if not an admin route or if authenticated
  return NextResponse.next();
}

// Specify the paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*'], // Protect all routes under /admin
};
