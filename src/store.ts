import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';
import { ReduxModel } from './model';
import { ModelStore, StateChangeListenerFn, StoreStateType } from './types';

type ReduxModelCls = new () => ReduxModel;
interface ReduxModelMap {
  [modelName: string]: ReduxModelCls;
}

export const createStore = (initialModels: ReduxModelMap): ModelStore => {
  const models = _mapValues(initialModels, (Model) => new Model());

  const listeners: StateChangeListenerFn[] = [];
  const subscribe = (listener: StateChangeListenerFn) => {
    listeners.push(listener);
  };

  const getAllState = () => _mapValues(models, (model) => model.getAllState());

  Object.entries(models).forEach(([name, model]) => {
    model.dispatch = () => {
      for (const listener of listeners) {
        listener(name, getAllState());
      }
    };
  });

  return {
    models,
    subscribe,
    getAllState,
  };
};
