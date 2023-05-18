import { CacheOptions, CacheStrategy, ICache, NodeCacheStrategy } from '@/services'
import { MemoryCache, MemoryCacheOptions as MemoryCacheOptions } from '@/services/cache/memory.cache'

export class Cache<O extends CacheStrategy> implements ICache {
  private _adapter: ICache

  constructor(strategy: O, options?: CacheOptions['options']) {
    switch (strategy) {
      case 'node':
        this._adapter = new NodeCacheStrategy({
          stdTTL: options?.ttl,
          useClones: false,
        })
        break
      case 'memory':
        this._adapter = new MemoryCache(options as MemoryCacheOptions)
        break
    }
  }

  async get<T>(key: string): Promise<T | null> {
    return await this._adapter.get<T>(key)
  }

  async set(key: string, value: unknown): Promise<boolean> {
    return await this._adapter.set(key, value)
  }

  async has(key: string): Promise<boolean> {
    return await this._adapter.has(key)
  }
}
