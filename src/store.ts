import _isFunction from 'lodash/isFunction';
import _mapValues from 'lodash/mapValues';
import {
  AnyAction,
  combineReducers,
  createStore as oriCreateStore,
  Dispatch,
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
  const models = _mapValues(initialModels, (Model) => new Model());

  const reducers = combineReducers(
    _mapValues(models, (model, modelName) => createReducer(modelName, model))
  );

  const store = oriCreateStore(reducers);
  const dispatch = store.dispatch;

  Object.entries(models).forEach(
    ([modelName, model]) =>
      (model.dispatch = () => {
        dispatch({ type: `${modelName}/all` }); // rewrite model`s dispatch fn
      })
  );

  return store;
};

/**
 * Create reducer from ReduxModelCls
 * @param ModelCls ReduxModelCls
 */
export function createReducer<T extends ReduxModel>(
  name: string,
  model: T
): Reducer {
  // A closeure function, if type model-name equal model-name
  return (
    state: StandardState = model.getAllState() || {},
    action: FluxStandardAction
  ): StandardState => {
    const [modelName] = action.type.split('/');
    if (modelName === name) {
      return model.getAllState();
    }

    return state;
  };
}
