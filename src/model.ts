import { StandardState } from './types';

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
export abstract class ReduxModel<S extends StandardState = {}> {
  protected abstract state: S;

  public getState(): S {
    return { ...this.state };
  }

  public setState<K extends keyof S>(state: Pick<S, K> | S | null) {
    this.state = {
      ...this.state,
      ...state,
    };
  }
}
