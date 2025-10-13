class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  getAccountToken(): string | null {
    return localStorage.getItem('account-token')
  }

  setAccountToken(token: string): void {
    localStorage.setItem('account-token', token)
  }

  getAgentToken(): string | null {
    return localStorage.getItem('agent-token')
  }

  setAgentToken(token: string): void {
    localStorage.setItem('agent-token', token)
  }

  isAccountAuthenticated(): boolean {
    const token = this.getAccountToken()

    return token !== null
  }

  isAgentAuthenticated(): boolean {
    const token = this.getAgentToken()

    return token !== null
  }

  clearAccountAuth(): void {
    localStorage.removeItem('account-token')
  }

  clearAgentAuth(): void {
    localStorage.removeItem('agent-token')
  }

  clearAll(): void {
    this.clearAccountAuth()
    this.clearAgentAuth()
  }
}

export const authService = AuthService.getInstance()
