import { createStore } from '../../src/store';
import { UserModel } from '../models/user';

describe('store', () => {
  describe('createStore', () => {
    test('createStore should be ok', () => {
      const store = createStore({
        user: UserModel,
      });

      expect(store).toBeTruthy();
    });
  });
});
