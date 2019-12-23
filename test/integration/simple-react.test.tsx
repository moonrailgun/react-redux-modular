import { mount, shallow } from 'enzyme';
import React from 'react';
import { connectModel, ModelProvider } from '../../src';
import { createStore } from '../../src/store';
import { CounterModel } from '../models/counter';
import { sleep } from '../utils';

interface CounterProps {
  counter: CounterModel;
}

class Counter extends React.Component<CounterProps> {
  public render() {
    const { counter } = this.props;
    return (
      <div>
        <div id="num">{counter.getState('num')}</div>
        <button onClick={counter.increase}>Increase</button>
        <button onClick={counter.decrease}>Decrease</button>
      </div>
    );
  }
}

const ConnectedCounter = connectModel(['counter'])(Counter);

describe('intergration react component', () => {
  test('render snapshot', () => {
    const store = createStore({
      counter: CounterModel,
    });

    const wrapper = mount(
      <ModelProvider store={store}>
        <ConnectedCounter />
      </ModelProvider>
    );

    expect(wrapper.toJson()).toMatchSnapshot();
  });

  test('store should update', () => {
    const store = createStore({
      counter: CounterModel,
    });

    const wrapper = mount(
      <ModelProvider store={store}>
        <ConnectedCounter />
      </ModelProvider>
    );

    const btns = wrapper.find('div > button');
    expect(btns).toHaveLength(2);

    expect(store.getAllState()).toMatchObject({
      counter: { num: 0 },
    });

    btns.at(0).simulate('click');
    expect(store.getAllState()).toMatchObject({
      counter: { num: 1 },
    });

    btns.at(1).simulate('click');
    expect(store.getAllState()).toMatchObject({
      counter: { num: 0 },
    });
  });

  test.only('dom should update', () => {
    const store = createStore({
      counter: CounterModel,
    });

    const wrapper = mount(
      <ModelProvider store={store}>
        <ConnectedCounter />
      </ModelProvider>
    );

    const btns = wrapper.find('div > button');
    expect(btns).toHaveLength(2);
    const dom = wrapper.find('#num');
    expect(dom).toHaveLength(1);

    expect(dom.text()).toBe('0');

    btns.at(0).simulate('click');
    expect(dom.text()).toBe('1');

    btns.at(1).simulate('click');
    expect(dom.text()).toBe('0');
  });
});
