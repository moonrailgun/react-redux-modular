import { ComponentType, createElement, FC, useContext } from 'react';
import { modelContext } from './context';
import { ModelMapType } from './types';

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

  return <P>(Component: ComponentType<P>): FC<P> => {
    return (props) => {
      const { models } = useContext(modelContext);

      const modelMap: ModelMapType = {};
      for (const modelName of modelNames) {
        modelMap[modelName] = models[modelName];
      }

      return createElement<P>(Component, {
        ...props,
        ...modelMap,
      });
    };
  };
};
