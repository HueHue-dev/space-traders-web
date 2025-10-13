import { BaseApiService } from '@/services/api/BaseApiService.ts'

export class AccountApiService extends BaseApiService {
  constructor(accountToken: string) {
    super(accountToken, 'account')
  }
}
