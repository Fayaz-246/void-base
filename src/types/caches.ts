export type ExpireCallback<V> = (key: string, value: V) => void;

export interface ITimedCacheConstructorOps<V> {
  name: string;
  onExpire?: ExpireCallback<V>;
  defaultTTL?: string;
}
