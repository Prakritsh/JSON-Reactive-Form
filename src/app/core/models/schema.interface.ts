export interface ProjectSchema {
  name: string;
  description: string;
  tags: string[];
  settings: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    refreshInterval: number;
  };
  members: Member[];
}
export interface Member {
  id: number;
  name: string;
  role: string;
}
