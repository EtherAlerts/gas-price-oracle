import { ICache } from '@/services'

export interface MemoryCacheOptions {
  ttl?: number
}

export interface StoredData {
  expiresAt?: number
  value: unknown
}

export class MemoryCache implements ICache {
  private _store: Map<string, StoredData> = new Map()

  constructor(private readonly _options: MemoryCacheOptions = {}) {}

  async get<T>(key: string): Promise<T | null> {
    const stored = this._store.get(key)
    let result = null
    if (stored) {
      if (typeof stored.expiresAt === 'number' && Date.now() > stored.expiresAt) {
        this._store.delete(key)
      } else {
        result = stored.value as T
      }
    }
    return Promise.resolve(result)
  }

  async set(key: string, value: unknown): Promise<boolean> {
    const data: StoredData = { value }
    if (typeof this._options.ttl === 'number') {
      data.expiresAt = Date.now() + this._options.ttl * 1000
    }

    await this._store.set(key, data)
    return true
  }

  async has(key: string): Promise<boolean> {
    return await this._store.has(key)
  }
}
