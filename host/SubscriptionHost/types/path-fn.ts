export interface PathFn<T, V> {
  (state: T): V;
}
