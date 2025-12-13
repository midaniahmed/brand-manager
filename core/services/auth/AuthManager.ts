type TokenProvider = () => Promise<string | null>;

export class AuthManager {
  private static instance: AuthManager;
  private tokenProvider?: TokenProvider;

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  setTokenProvider(provider: TokenProvider) {
    this.tokenProvider = provider;
  }

  async getToken(): Promise<string> {
    if (!this.tokenProvider) {
      throw new Error('Token provider not initialized');
    }

    const token = await this.tokenProvider();
    if (!token) {
      throw new Error('No authentication token available');
    }

    return token;
  }
}
