export class JwtUtils {

  private static TOKEN_STORAGE_KEY = 'auth_token'; 
    /**
     * Simulates JWT token generation on the frontend.
     * DO NOT USE THIS FOR REAL SECURITY.  This is for demonstration in a frontend-only context.
     * @param payload The payload to include in the token.
     * @returns A string representing a simplified JWT.
     */
    static generateFrontendToken(payload: Record<string, any>): string {
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const encodedPayload = btoa(JSON.stringify(payload));
      const signature = 'dummy_signature'; // No real signing
      return `${header}.${encodedPayload}.${signature}`;
    }
  
    /**
     * Gets the token from local storage
     * @returns The token string or null
     */
    static getToken(): string | null{
      return localStorage.getItem('frontend_token');
    }
  
    /**
     * Removes the token from local storage
     */
    static removeToken(): void{
      localStorage.removeItem('frontend_token');
    }

    static saveToken(token: string): void {
      localStorage.setItem(JwtUtils.TOKEN_STORAGE_KEY, token);
    }
  }