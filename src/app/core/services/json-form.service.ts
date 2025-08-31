import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ProjectSchema } from '../models/schema.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonFormService {
// jsonData: Signal<ProjectSchema> = signal(this.defaultJson());  
jsonInput = signal('')
jsonData = signal('');  
  constructor() { } 
  defaultJson(): ProjectSchema {
    return {
  name: '',
  description: '',
  tags: [],
  settings: {
    notifications: false,
    theme: 'system',
    refreshInterval: 0
  },
  members: []
}
  }
}
