import Axios, { type AxiosInstance } from 'axios'
import {
  type AxiosCacheInstance,
  setupCache,
  buildWebStorage,
  type CacheAxiosResponse,
} from 'axios-cache-interceptor'
import Bottleneck from 'bottleneck'

export enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    date: string
    total: number
    page: number
    limit: number
  }
}

export abstract class BaseApiService {
  private axiosInstance: AxiosInstance = Axios.create()

  protected axios: AxiosCacheInstance

  protected limiter: Bottleneck

  protected readonly token: string

  protected baseUrl = 'https://api.spacetraders.io/v2/'

  protected constructor(token: string, cachePrefix: string) {
    this.token = token

    this.axios = setupCache(this.axiosInstance, {
      storage: buildWebStorage(localStorage, `axios-cache-${cachePrefix}`),
    })

    this.limiter = new Bottleneck({
      minTime: 500,
      maxConcurrent: 1,
    })

    this.limiter.on('failed', (error, jobInfo) => {
      return null
    })
  }

  protected async request<T>(
    url: string,
    requestType: string,
    ttl: number,
    page: number,
    limit: number = 5
  ): Promise<PaginatedResponse<T>> {
    return await this.limiter.schedule(async () => {
      const response: CacheAxiosResponse = await this.axios.get(this.baseUrl + url + `?page=${page}&limit=${limit}`, {
        method: requestType,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        cache: {
          ttl: ttl,
        },
      })
      if (response.status === 400) {
        throw new Error('invalid username or token')
      }
      if (!response.cached) {
        response.data.meta.date = new Date("2015-03-25T12:00").toLocaleString();
      }

      return { data: response.data.data, meta: response.data.meta }
    })
  }

  protected async requestAll<T>(url: string, requestType: string, ttl: number): Promise<T[]> {
    let page = 1
    let isLastPage = false
    let data: T[] = []

    while (!isLastPage) {
      const response = await this.axios.get(this.baseUrl + url, {
        method: requestType,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        cache: {
          ttl: ttl,
        },
      })

      data.push(...response.data.data)
      const totalPages = Math.ceil(response.data.meta.total / response.data.meta.limit)
      isLastPage = page === totalPages
      page++
    }

    return data
  }

  protected get ONE_HOUR(): number {
    return 1000 * 60 * 60
  }
}
