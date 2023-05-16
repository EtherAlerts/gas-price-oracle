export interface ICache {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown): Promise<boolean>
  has(key: string): Promise<boolean>
}

export type CacheStrategy = 'node' | 'memory'

export type CacheOptions<O extends CacheStrategy = CacheStrategy> = {
  enabled?: boolean
  strategy?: O
  options?: {
    ttl?: number
  }
}
