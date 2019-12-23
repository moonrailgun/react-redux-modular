import { ReduxModel } from './model';

export interface StandardState {
  [key: string]: any;
}

export interface ModelMapType {
  [modelName: string]: ReduxModel;
}

export interface StoreStateType {
  [modelName: string]: StandardState;
}

export type StateChangeListenerFn = (
  modelName: string,
  allState: StoreStateType
) => void;

export interface ModelStore {
  models: ModelMapType;
  subscribe: (listener: StateChangeListenerFn) => void;
  getAllState: () => StoreStateType;
}
