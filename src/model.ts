import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { StandardState } from './types';

type ReduxModelDispatchFn = () => void;

/**
 * A base redux model to be extends
 *
 * class User extends ReduxModel<{
 *    username: string
 * }> {
 *    state = {
 *       username: ''
 *    };
 * }
 */
export abstract class ReduxModel<
  S extends StandardState = { [key: string]: any }
> {
  public dispatch?: ReduxModelDispatchFn;
  protected abstract state: S;

  public getState<K extends keyof S>(key: K): S[K] {
    return _get(this.state, key);
  }

  public getAllState(): S {
    return { ...this.state };
  }

  public setState<K extends keyof S>(state: Pick<S, K> | S | null) {
    this.state = {
      ...this.state,
      ...state,
    };

    if (_isFunction(this.dispatch)) {
      this.dispatch();
    } else {
      console.error('dispatch has not init');
    }
  }
}
