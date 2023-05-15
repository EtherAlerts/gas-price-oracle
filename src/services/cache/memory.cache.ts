import { ICache } from '@/services/cache/cache'

export interface Options {
  ttl: number
}

export class MemoryCache implements ICache {
  private _store: Map<string, { expiresAt: number; value: unknown }> = new Map()

  constructor(private readonly options: Options) {}

  async get<T>(key: string): Promise<T | null> {
    const stored = this._store.get(key)
    let result = null
    if (stored) {
      if (stored.expiresAt <= Date.now()) {
        result = stored.value as T
      } else {
        this._store.delete(key)
      }
    }
    return Promise.resolve(result)
  }

  async set(key: string, value: unknown): Promise<boolean> {
    const expireAt = Date.now() + this.options.ttl * 1000
    await this._store.set(key, { expiresAt: expireAt, value })
    return true
  }

  async has(key: string): Promise<boolean> {
    return await this._store.has(key)
  }
}
