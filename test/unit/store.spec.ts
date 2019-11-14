import { createReducer } from '../../src/store';
import { UserModel } from '../models/user';

describe('store', () => {
  describe('createReducer', () => {
    test('createReducer should be ok', () => {
      const reducer = createReducer('user', UserModel);

      expect(typeof reducer).toBe('function');
    });

    test('reducer should be return origin state if not match any type', () => {
      const reducer = createReducer('user', UserModel);

      const prevState = {
        username: 'test',
      };
      const nextState = reducer(prevState, { type: 'any' });
      expect(nextState).toBe(prevState);
    });

    test('reducer shoule be return new state if match any type', () => {
      const reducer = createReducer('user', UserModel);

      const prevState = {
        username: 'test',
      };
      const nextState = reducer(prevState, { type: 'user/any' });
      expect(nextState).not.toBe(prevState);
    });
  });
});
