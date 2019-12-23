import { ReduxModel } from '../../src';

interface State {
  num: number;
}
export class CounterModel extends ReduxModel<State> {
  public state: State = {
    num: 0,
  };

  public increase = () => {
    this.setState({
      num: this.state.num + 1,
    });
  };

  public decrease = () => {
    this.setState({
      num: this.state.num - 1,
    });
  };
}
