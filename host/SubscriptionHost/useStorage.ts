import {useState, useEffect} from 'react';
import {defaultSettings} from './config';
import set from 'lodash/fp/set';
import {Path, SellingPlan} from './types';

const states = new Map<string, object>();

// useEffect waits a tick before firing making 2+ components
// using useStorage with the same storageKey default to initialState.
// getInitialState will return the same state each time.
function getInitialState<T extends object>(storageKey: string, initialState: T) {
  if (states.has(storageKey)) {
    return states.get(storageKey);
  }

  const serializedState = localStorage.getItem(storageKey);
  const storedState = JSON.parse(serializedState || 'null') || initialState;
  states.set(storageKey, storedState);

  return storedState;
}

export function useStorage<T extends object>(
  storageKey: string,
  initialState: T
) {
  const [state, setState] = useState(getInitialState(storageKey, initialState));
  function setPathState<T>(path: Path, value: T): void {
    setState(set(path, value)(state));
  }

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  }, [state]);

  return [state, setPathState, setState] as const;
}

export function useSettings() {
  return useStorage('SubscriptionHost::Settings', defaultSettings);
}

export function usePageState() {
  return useStorage('SubscriptionHost::pageState', {
    extensionOpen: false,
    activeSellingPlan: null as SellingPlan | null,
    newSellingPlan: null as SellingPlan | null,
  });
}
