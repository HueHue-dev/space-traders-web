class ConfigService {
  private static instance: ConfigService

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  getActiveMenu(): string | null {
    return localStorage.getItem('active-menu')
  }

  setActiveMenu(menu: string): void {
    localStorage.setItem('active-menu', menu)
  }
}

export const configService = ConfigService.getInstance()
