import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  showLoading?: boolean
}

export interface ResponseInterceptor {
  onFulfilled: (response: AxiosResponse) => AxiosResponse
  onRejected: (error: unknown) => Promise<never>
}
