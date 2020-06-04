import set from 'lodash/fp/set';

type Key = string | number | symbol;

const PathSymbol = Symbol('path');

function pathProxy(path: Key[] = []): any {
  return new Proxy(
    {
      get [PathSymbol]() {
        return path;
      },
    },
    {
      get: (target: any, prop: Key) => {
        if (prop === PathSymbol) {
          return target[prop];
        }
        return pathProxy(target[PathSymbol].concat(prop));
      },
    }
  );
}

export function proxyGetPath(fn: (state: any) => any): Key[] {
  return fn(pathProxy())[PathSymbol];
}

export function pipe<A, B, C>(fn: (state: A) => B, fn2: (state: B) => C) {
  return (state: A) => fn2(fn(state));
}

interface SetterReturn<T> {
  (state: T): T;
}

export function setter<T, V>(fn: (state: T) => V, value: V): SetterReturn<T> {
  const proxy = fn(pathProxy()) as any;
  return set(proxy[PathSymbol], value) as any;
}
