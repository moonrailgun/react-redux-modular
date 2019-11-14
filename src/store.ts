import _mapValues from 'lodash/mapValues';
import {
  combineReducers,
  createStore as oriCreateStore,
  Reducer,
  Store,
} from 'redux';
import { ReduxModel } from './model';
import { FluxStandardAction, StandardState } from './types';

type ReduxModelCls = new () => ReduxModel;
interface ReduxModelMap {
  [modelName: string]: ReduxModelCls;
}

export const createStore = (
  initialModels: ReduxModelMap = {},
  middleware = [] // TODO
): Store => {
  const reducers = combineReducers(
    _mapValues(initialModels, (ModelCls, modelName) =>
      createReducer(modelName, ModelCls)
    )
  );

  const store = oriCreateStore(reducers);

  return store;
};

/**
 * Create reducer from ReduxModelCls
 * @param ModelCls ReduxModelCls
 */
export function createReducer<T extends ReduxModel>(
  name: string,
  ModelCls: new () => T
): Reducer {
  const model = new ModelCls();

  // A closeure function, if type model-name equal model-name
  return (
    state: StandardState = model.getState() || {},
    action: FluxStandardAction
  ): StandardState => {
    const [modelName] = action.type.split('/');
    if (modelName === name) {
      return model.getState();
    }

    return state;
  };
}
