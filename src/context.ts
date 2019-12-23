import React from 'react';
import { ModelStore } from './types';

// 全局的Context
export const modelContext = React.createContext<ModelStore>({
  models: {},
  // tslint:disable-next-line: no-empty
  subscribe: () => {},
  getAllState: () => ({}),
});
