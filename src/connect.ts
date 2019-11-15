import { connect } from 'react-redux';
import { StandardState } from './types';

/**
 * connect ReduxModel with modelName
 *
 * Usage:
 * connect(['user', 'counter'])(Component)
 *
 * class Component extends React.Component {
 *  render() {
 *    return <div>{this.props.counter.getState('num')}</div>
 *  }
 * }
 */

// TODO: temporary use any to fix type problem
export const connectModel = (modelNames: string[]): any => {
  // list all model name
  const mapState = (state: StandardState) => {
    return modelNames.reduce(
      (prevState, name) => ({
        ...prevState,
        ...{
          [name]: state[name],
        },
      }),
      {}
    );
  };

  return connect(mapState);
};
