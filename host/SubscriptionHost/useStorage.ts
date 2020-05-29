import {useState, useEffect} from 'react';
import {defaultSettings} from './config';
import {DeepPartial} from './types';
import merge from 'lodash.merge';

export function useStorage<T>(storageKey: string, initialState: T) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const serializedState = localStorage.getItem(storageKey);
    const storedState = JSON.parse(serializedState || 'null') || initialState;
    
    setState(storedState);
  }, []);

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  }, [state]);

  const patchState = (partialState: DeepPartial<T>) => {
    const newState = merge({}, state, partialState);
    setState(newState);
  };

  return [state, patchState] as const;
}

export function useSettings() {
  return useStorage('SubscriptionHost::Settings', defaultSettings);
}
