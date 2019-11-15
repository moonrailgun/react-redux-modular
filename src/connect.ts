import { connect } from 'react-redux';
import { StandardState } from './types';

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
