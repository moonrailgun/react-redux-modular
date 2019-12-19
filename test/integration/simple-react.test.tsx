import React from 'react';
import renderer from 'react-test-renderer';
import { connectModel, ModelProvider } from '../../src';
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

    const testRenderer = renderer.create(
      <ModelProvider store={store}>
        <ConnectedCounter />
      </ModelProvider>
    );

    console.log(JSON.stringify(testRenderer.toJSON()));
  });
});
