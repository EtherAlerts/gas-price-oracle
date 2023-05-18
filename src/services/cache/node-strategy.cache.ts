import { type Options as CacheNodeOptions, type prototype as NodeCache } from 'node-cache'
import { ICache } from '@/services'

export class NodeCacheStrategy implements ICache {
  private nodeCache: Promise<typeof NodeCache>

  constructor(options: CacheNodeOptions = {}) {
    // Dynamic import for prevent error during building in svelte kit
    this.nodeCache = import('node-cache').then((result) => {
      const NodeCacheModule = result.default
      return new NodeCacheModule(options)
    })
  }

  async get<T>(key: string): Promise<T | null> {
    return (await this.nodeCache).get<T>(key) ?? null
  }

  async set(key: string, value: unknown): Promise<boolean> {
    return (await this.nodeCache).set(key, value)
  }

  async has(key: string): Promise<boolean> {
    return (await this.nodeCache).has(key)
  }
}
