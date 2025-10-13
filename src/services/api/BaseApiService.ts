import Axios, { type AxiosInstance } from 'axios'
import { type AxiosCacheInstance, setupCache, buildWebStorage } from 'axios-cache-interceptor'
import Bottleneck from 'bottleneck'

export enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
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
    page: number | null = null,
  ): Promise<T> {
    return await this.limiter.schedule(async () => {
      let params: string = ''
      if (page != null) {
        params = `?page=${page}`
      }
      const response = await this.axios.get(this.baseUrl + url + params, {
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

      return response.data.data
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
