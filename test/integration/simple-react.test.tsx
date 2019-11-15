import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from '../../src';
import { connectModel } from '../../src/connect';
import { createStore } from '../../src/store';
import { CounterModel } from '../models/counter';

interface CounterProps {
  counter: CounterModel;
}

class Counter extends React.Component<CounterProps> {
  public render() {
    const { counter } = this.props;
    return (
      <div>
        <div>{counter.getState('num')}</div>
        <button onClick={counter.increase}>Increase</button>
        <button onClick={counter.decrease}>Decrease</button>
      </div>
    );
  }
}

const ConnectedCounter = connectModel(['counter'])(Counter);

describe('intergration react component', () => {
  // TODO
  test('store render snapshot', () => {
    const store = createStore({
      counter: CounterModel,
    });

    renderer.create(
      <Provider store={store}>
        <ConnectedCounter />
      </Provider>
    );
  });
});
