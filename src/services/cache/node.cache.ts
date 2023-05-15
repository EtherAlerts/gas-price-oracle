import NodeCacheModule, { Options as CacheNodeOptions } from 'node-cache'
import { ICache } from '@/services/cache/cache'

export class NodeCache implements ICache {
  private nodeCache: NodeCacheModule

  constructor(options: CacheNodeOptions) {
    this.nodeCache = new NodeCacheModule(options ?? {})
  }

  async get<T>(key: string): Promise<T | null> {
    return await (this.nodeCache.get<T>(key) ?? null)
  }

  async set(key: string, value: unknown): Promise<boolean> {
    return await this.nodeCache.set(key, value)
  }

  async has(key: string): Promise<boolean> {
    return await this.nodeCache.has(key)
  }
}
