import Axios, { type AxiosInstance } from 'axios';
import {
  type AxiosCacheInstance,
  setupCache, buildWebStorage ,
} from 'axios-cache-interceptor'
import Bottleneck from 'bottleneck';
import type { Faction } from '@/models/faction.ts'
import type { Agent } from '@/models/agent.ts'

const ONE_HOUR = 1000 * 60 * 60;

enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class ApiService {
  private axiosInstance: AxiosInstance = Axios.create();

  private axios: AxiosCacheInstance = setupCache(
    this.axiosInstance,
    {
      storage: buildWebStorage(localStorage, 'axios-cache'),
    }
  );

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

  async getFactions<T>(page: number): Promise<Faction[]> {
    return await this.request<Faction[]>('factions', RequestType.GET, ONE_HOUR, page);
  }

  async getAllFactions<T>(): Promise<Faction[]> {
    return await this.requestAll<Faction>('factions', RequestType.GET, ONE_HOUR)
  }

  async getMyAgent<T>(): Promise<Agent> {
    return await this.request<Agent>('my/agent', RequestType.GET, ONE_HOUR);
  }

  private async request<T>(url: string, requestType: string, ttl: number, page: number|null = null): Promise<T> {
    return await this.limiter.schedule(async () => {
      let params: string = '';
      if (page != null) {
        params = `?page=${page}`;
      }
      const response = await this.axios.get(this.baseUrl + url + params, {
        method: requestType,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        cache: {
          ttl: ttl
        }
      });
      if (response.status === 400) {
        throw new Error('invalid username or token');
      }

      return response.data.data;
    });
  }

  private async requestAll<T>(url: string, requestType: string, ttl: number): Promise<T[]> {
    let page = 1;
    let isLastPage = false;
    let data: T[] = [];

    while (!isLastPage) {
      const response = await this.axios.get(this.baseUrl + url, {
        method: requestType,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        cache: {
          ttl: ttl
        }
      });

      data.push(...response.data.data);
      const totalPages = Math.ceil(response.data.meta.total / response.data.meta.limit);
      isLastPage = page === totalPages;
      page++;
    }

    return data
  }
}
