import { createElement, FC } from 'react';
import { modelContext } from './context';
import { ModelStore } from './types';

interface ProviderProps {
  store: ModelStore;
}
export const ModelProvider: FC<ProviderProps> = (props) => {
  const Provider = modelContext.Provider;

  return createElement(
    Provider,
    {
      value: props.store,
    },
    props.children
  );
};
ModelProvider.displayName = 'ReactModelProvider';
