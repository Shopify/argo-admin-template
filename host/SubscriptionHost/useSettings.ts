import {useState} from 'react';
import {Settings} from './types';

class SettingsStorage {
  private settings: Settings | undefined;

  constructor(private storage: Storage) {}

  get(): Settings {
    if (this.settings) {
      return this.settings;
    }

    const serializedSettings = this.storage.getItem(
      'SubscriptionHost::Settings'
    );
    this.settings = JSON.parse(serializedSettings || '{}');

    return this.settings || {};
  }

  set(settings: Settings) {
    const serializedSettings = JSON.stringify(settings);
    this.settings = settings;
    this.storage.setItem('SubscriptionHost::Settings', serializedSettings);
  }
}
const storage = new SettingsStorage(localStorage);

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(storage.get());
  const saveSettings = (_settings: Settings) => {
    setSettings(_settings);
    storage.set(_settings);
  };

  return [settings, saveSettings] as const;
}
