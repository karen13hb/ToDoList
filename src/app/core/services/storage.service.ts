import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage?: Storage;

  constructor(private storage: Storage) { }

  async init() {
    this._storage = await this.storage.create();
  }

  get<T>(key: string): Promise<T | null> {
    return this._storage?.get(key) ?? Promise.resolve(null);
  }

  set<T>(key: string, value: T): Promise<void> {
    return this._storage!.set(key, value);
  }

  remove(key: string): Promise<void> {
    return this._storage!.remove(key);
  }
}
