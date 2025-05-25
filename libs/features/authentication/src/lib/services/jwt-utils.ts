export class JwtUtils {
  private static TOKEN_STORAGE_KEY = 'auth_token';

  // Utility class for handling basic JWT (JSON Web Token) operations on the frontend.
  // This includes generating mock tokens and managing their storage.

  static generateFrontendToken(payload: Record<string, any>): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'dummy_signature';
    return `${header}.${encodedPayload}.${signature}`;
  }

  static getToken(): string | null {
    return localStorage.getItem(JwtUtils.TOKEN_STORAGE_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(JwtUtils.TOKEN_STORAGE_KEY);
  }

  static saveToken(token: string): void {
    localStorage.setItem(JwtUtils.TOKEN_STORAGE_KEY, token);
  }
}