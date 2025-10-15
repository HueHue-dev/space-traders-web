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

export interface PostResponse<T> {
  data: T
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

  protected async get<T>(
    url: string,
    ttl: number,
    page: number,
    limit: number = 5,
  ): Promise<PaginatedResponse<T>> {
    return await this.limiter.schedule(async () => {
      const response: CacheAxiosResponse = await this.axios.get(
        this.baseUrl + url + `?page=${page}&limit=${limit}`,
        {
          method: RequestType.GET,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          id: url.replace('/', '-'),
          cache: {
            ttl: ttl,
          },
        },
      )
      if (response.status === 400) {
        throw new Error('invalid username or token')
      }
      if (!response.cached) {
        response.data.meta.date = new Date('2015-03-25T12:00').toLocaleString()
      }

      return { data: response.data.data, meta: response.data.meta }
    })
  }

  protected async post<T>(url: string, cacheKeysToInvalidate: string[] = []): Promise<PostResponse<T>> {
    return await this.limiter.schedule(async () => {
        cacheKeysToInvalidate.forEach((key) => {
          this.axios.storage.remove(key)
        })

      const response: CacheAxiosResponse = await this.axios.post(this.baseUrl + url, null, {
        method: RequestType.POST,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 400) {
        throw new Error('invalid username or token')
      }

      return { data: response.data.data }
    })
  }

  protected get ONE_HOUR(): number {
    return 1000 * 60 * 60
  }
}
