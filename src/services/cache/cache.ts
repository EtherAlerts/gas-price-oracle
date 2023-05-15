import { NodeCache } from '@/services'
import { Options as NodeCacheOptions } from 'node-cache'
import { MemoryCache, Options as MemoryCacheOptions } from '@/services/cache/memory.cache'

export interface ICache {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown): Promise<boolean>
  has(key: string): Promise<boolean>
}

export type Strategy = 'node' | 'memory'

export class Cache<O extends Strategy> implements ICache {
  private _adapter: ICache

  constructor(
    strategy: O,
    options: {
      node: NodeCacheOptions
      memory: MemoryCacheOptions
    }[O],
  ) {
    switch (strategy) {
      case 'node':
        this._adapter = new NodeCache(options as NodeCacheOptions)
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
