import { connect as oriConnect } from 'react-redux';
import { StandardState } from './types';

export const connect = (...modelNames: string[]) => {
  // 将模块所有的都列出来
  const mapState = (state: StandardState) => {
    return modelNames.reduce(
      (prevState, name) => ({
        ...prevState,
        ...state[name],
      }),
      {}
    );
  };

  return oriConnect(mapState);
};
