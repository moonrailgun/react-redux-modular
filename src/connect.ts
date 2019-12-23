import _mapValues from 'lodash/mapValues';
import {
  ComponentType,
  createElement,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

export const connectModel = (modelNames: string[]): any => {
  return <P>(Component: ComponentType<P>): FC<P> => {
    return (props) => {
      const { models, subscribe } = useContext(modelContext);
      const modelMap = useMemo(() => {
        const map: ModelMapType = {};
        for (const modelName of modelNames) {
          map[modelName] = models[modelName];
        }

        return map;
      }, [models, modelNames]);

      const [modelState, setModelState] = useState(
        getModelMapAllState(modelMap)
      );
      useEffect(() => {
        subscribe((name) => {
          if (modelNames.includes(name)) {
            setModelState(getModelMapAllState(modelMap));
          }
        });
      }, [models, subscribe]);

      return createElement<P>(Component, {
        ...props,
        modelState, // 这个参数起始可以不传，先传下去方便调试
        ...modelMap,
      });
    };
  };
};

function getModelMapAllState(modelMap: ModelMapType) {
  return _mapValues(modelMap, (model) => model.getAllState());
}
