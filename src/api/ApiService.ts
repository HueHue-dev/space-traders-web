import Axios, { type AxiosInstance } from 'axios';
import {
  type AxiosCacheInstance,
  type CacheAxiosResponse,
  setupCache,
} from 'axios-cache-interceptor'
import Bottleneck from 'bottleneck';

export class ApiService {
  private axiosInstance: AxiosInstance = Axios.create();

  private axios: AxiosCacheInstance = setupCache(this.axiosInstance);

  private limiter: Bottleneck;

  private readonly token?: string = undefined;

  private baseUrl = 'https://api.spacetraders.io/v2/';

  constructor(token: string) {
    this.token = token;
    this.limiter = new Bottleneck({
      minTime: 500,
      maxConcurrent: 1,
    });

    this.limiter.on('failed', (error, jobInfo) => {
      return null;
    })
  }

  async getFactions() {
    return await this.request<any[]>('factions', 'GET');
  }

  private async request<T>(url: string, type: string): Promise<CacheAxiosResponse<T>> {
    return await this.limiter.schedule(async () => {
      const data = await this.axios.get(this.baseUrl + url, {
        method: type,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (data.status === 400) {
        throw new Error('invalid username or token');
      }

      return data;
    });
  }
}
