import { ReduxModel } from './model';

export interface FluxStandardAction {
  type: string;
  payload?: {
    [key: string]: any;
  };
  error?: boolean;
  meta?: any;
}

export interface StandardState {
  [key: string]: any;
}

export interface ModelMapType {
  [modelName: string]: ReduxModel;
}

export interface ModelStore {
  model: ModelMapType;
}
